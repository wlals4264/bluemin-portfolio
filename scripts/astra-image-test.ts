/**
 * GPT-6 Astra를 3D Asset Art Director + Image Generation Orchestrator로 사용하는 PoC.
 *
 * 지금까지의 astra-review.ts/astra-test.ts는 Astra를 "Design System Reviewer"(텍스트만
 * 반환)로 썼다. 이 스크립트는 다르다 — Astra에게 docs/design-system/3d-assets.md(3D asset
 * art direction의 source of truth)와 이번 생성 대상(subject) 브리핑을 함께 주고, Astra가
 * Responses API의 Image Generation Tool을 **직접 호출**해서 실제 이미지를 만들도록 한다.
 * 프롬프트 문구는 이 스크립트가 아니라 Astra 자신이(재료/조명/카메라/구도를 판단해) 정한다.
 *
 * 이번 PoC 범위: 6개 asset 중 `profile` 하나만 생성한다. 결과는 production 경로
 * (public/assets/3d/info/profile.webp)가 아니라 git에 커밋되지 않는 임시 위치
 * (tmp/astra-3d/)에 원본 형식 그대로 저장한다 — 검토 후 승인되면 별도 단계에서
 * WebP로 최적화해 production 경로로 옮긴다.
 *
 * - 애플리케이션 코드와는 무관한 독립 실행 스크립트다.
 * - .env.local의 내용을 직접 읽거나 출력하지 않는다 — API 키는 항상
 *   `process.env.OPENAI_API_KEY`로만 참조한다. (.env.local을 process.env로
 *   로드하는 것은 실행 명령어의 `--env-file` 옵션이 담당한다.)
 *
 * 실행 방법은 파일 하단 주석 또는 채팅 답변 참고.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import OpenAI, { APIError } from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs', 'design-system');
const PROMPTS_DIR = path.join(__dirname, 'prompts');
const OUTPUT_DIR = path.join(REPO_ROOT, 'tmp', 'astra-3d');

// gpt-6-astra: astra-test.ts/astra-review.ts와 동일한 모델 문자열.
const MODEL = 'gpt-6-astra';
// 이미지 생성 PoC이므로 high/max는 쓰지 않는다.
const REASONING_EFFORT = 'medium';

// Image Generation Tool 서브모델 — sunburst(품질 우선) vs flare(속도 우선) 중,
// 이번 asset은 나머지 5개의 visual reference가 될 기준작이라 품질을 우선한다.
const IMAGE_MODEL = 'gpt-image-2.5-sunburst';
const IMAGE_SIZE = '1024x1024';
const IMAGE_QUALITY = 'high';
const IMAGE_OUTPUT_FORMAT = 'png';

const SUBJECT_KEY = 'profile';

const INPUT_FILES = {
  artDirectorPrompt: path.join(PROMPTS_DIR, 'astra-3d-art-director.md'),
  assetDoc: path.join(DOCS_DIR, '3d-assets.md'),
  subjectBrief: path.join(PROMPTS_DIR, 'subjects', `${SUBJECT_KEY}.md`),
} as const;

const OUTPUT_IMAGE_FILE = path.join(OUTPUT_DIR, `${SUBJECT_KEY}-poc.${IMAGE_OUTPUT_FORMAT}`);
const OUTPUT_NOTES_FILE = path.join(OUTPUT_DIR, `${SUBJECT_KEY}-poc.notes.md`);

/** 입력 파일 하나를 읽는다. 실패 시 어떤 파일이 문제인지 명확히 알 수 있게 라벨을 붙여 에러를 다시 던진다. */
async function readInputFile(label: string, filePath: string): Promise<string> {
  try {
    return await readFile(filePath, 'utf-8');
  } catch (error) {
    console.error(`[astra-image-test] ${label} 파일을 읽을 수 없습니다: ${filePath}`);
    throw error;
  }
}

/**
 * Art Director 프롬프트 + 3d-assets.md(source of truth) + subject 브리핑을 하나의 문자열로
 * 합쳐 Astra에 보낼 입력을 만든다. OpenAI 호출과 분리해두어 API를 실제로 부르지 않고도
 * 이 부분만 단독으로 검증할 수 있다.
 */
export async function buildImageGenerationInput(): Promise<string> {
  const [artDirectorPrompt, assetDoc, subjectBrief] = await Promise.all([
    readInputFile('astra-3d-art-director.md', INPUT_FILES.artDirectorPrompt),
    readInputFile('3d-assets.md', INPUT_FILES.assetDoc),
    readInputFile(`subjects/${SUBJECT_KEY}.md`, INPUT_FILES.subjectBrief),
  ]);

  return [
    artDirectorPrompt.trim(),
    '',
    '---',
    '',
    '# 입력 문서: 3d-assets.md',
    '',
    assetDoc.trim(),
    '',
    '---',
    '',
    subjectBrief.trim(),
    '',
  ].join('\n');
}

/** Responses API 출력 배열에서 image_generation_call 항목의 base64 이미지만 뽑아낸다. */
function extractGeneratedImages(output: unknown): string[] {
  if (!Array.isArray(output)) return [];

  return output
    .filter(
      (item): item is { type: string; result: string } =>
        typeof item === 'object' &&
        item !== null &&
        (item as { type?: unknown }).type === 'image_generation_call' &&
        typeof (item as { result?: unknown }).result === 'string',
    )
    .map((item) => item.result);
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error(
      '[astra-image-test] OPENAI_API_KEY가 설정되어 있지 않아 실행을 중단합니다. ' +
        '.env.local에 OPENAI_API_KEY를 설정한 뒤 --env-file 옵션과 함께 다시 실행하세요.',
    );
    process.exit(1);
  }

  console.log(`[astra-image-test] subject="${SUBJECT_KEY}" 입력 문서를 읽는 중...`);
  const input = await buildImageGenerationInput();

  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log(
    `[astra-image-test] model="${MODEL}" reasoning.effort="${REASONING_EFFORT}" ` +
      `image_generation(model="${IMAGE_MODEL}", size="${IMAGE_SIZE}", quality="${IMAGE_QUALITY}", ` +
      `background="transparent", output_format="${IMAGE_OUTPUT_FORMAT}") 로 요청을 보냅니다...`,
  );

  const client = new OpenAI({ apiKey });

  try {
    const response = await client.responses.create({
      model: MODEL,
      input,
      reasoning: { effort: REASONING_EFFORT },
      tools: [
        {
          type: 'image_generation',
          model: IMAGE_MODEL,
          size: IMAGE_SIZE,
          quality: IMAGE_QUALITY,
          background: 'transparent',
          output_format: IMAGE_OUTPUT_FORMAT,
        },
      ],
    });

    const images = extractGeneratedImages(response.output);

    if (images.length === 0) {
      console.error(
        '[astra-image-test] 응답에서 image_generation_call 결과를 찾지 못했습니다. ' +
          '아래에 response.output 구조를 그대로 출력하니 스키마가 문서와 다른지 확인하세요.',
      );
      console.error(JSON.stringify(response.output, null, 2));
      process.exit(1);
    }

    if (images.length > 1) {
      console.warn(
        `[astra-image-test] image_generation_call이 ${images.length}개 반환됐습니다 — 첫 번째 결과만 저장합니다.`,
      );
    }

    await writeFile(OUTPUT_IMAGE_FILE, Buffer.from(images[0], 'base64'));
    console.log(`[astra-image-test] 이미지 저장 완료: ${path.relative(REPO_ROOT, OUTPUT_IMAGE_FILE)}`);

    const notes = [
      `# Astra 3D Asset PoC — ${SUBJECT_KEY}`,
      '',
      `- model: ${MODEL}`,
      `- reasoning.effort: ${REASONING_EFFORT}`,
      `- image tool model: ${IMAGE_MODEL}`,
      `- size / quality / background / format: ${IMAGE_SIZE} / ${IMAGE_QUALITY} / transparent / ${IMAGE_OUTPUT_FORMAT}`,
      '',
      '## Astra의 art direction 판단 (output_text)',
      '',
      response.output_text || '(output_text 없음)',
      '',
    ].join('\n');
    await writeFile(OUTPUT_NOTES_FILE, notes, 'utf-8');
    console.log(`[astra-image-test] Astra 판단 노트 저장 완료: ${path.relative(REPO_ROOT, OUTPUT_NOTES_FILE)}`);
  } catch (error) {
    if (error instanceof APIError) {
      console.error('[astra-image-test] API 오류가 발생했습니다.');
      console.error(`  status : ${error.status ?? '(no status)'}`);
      console.error(`  message: ${error.message}`);
    } else {
      console.error('[astra-image-test] 예상하지 못한 오류가 발생했습니다.');
      console.error(error);
    }
    process.exit(1);
  }
}

// 이 파일을 직접 실행했을 때만 main()을 구동한다 — buildImageGenerationInput()을
// 다른 스크립트/테스트에서 import해서 쓸 때는 API 호출이 함께 실행되지 않도록 한다.
const isDirectRun = path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1] ?? '');
if (isDirectRun) {
  main();
}

/**
 * 실행 방법:
 *   npm run astra:image-test
 *   (= node --env-file=.env.local --import tsx scripts/astra-image-test.ts)
 *
 * .env.local에 OPENAI_API_KEY가 설정되어 있어야 한다.
 * 결과는 tmp/astra-3d/profile-poc.png(이미지)와 tmp/astra-3d/profile-poc.notes.md
 * (Astra의 art direction 판단 텍스트)에 저장된다. 둘 다 git에 커밋되지 않는다(.gitignore).
 */
