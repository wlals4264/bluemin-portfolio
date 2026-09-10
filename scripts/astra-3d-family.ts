/**
 * GPT-6 Astra Reference-based 3D Icon Family Generation.
 *
 * STEP 7(astra-image-test.ts)에서 만든 `profile` PoC를 "3D Asset Style Master v1"으로
 * 취급하고, 그 실제 이미지를 Astra의 image input으로 첨부해서 같은 visual family에
 * 속하는 나머지 6개 asset(location/email/education/web/mobile/analytics)을 생성한다.
 *
 * astra-image-test.ts는 건드리지 않는다 — 이 스크립트는 완전히 별도로 동작한다.
 *
 * - 애플리케이션 코드와는 무관한 독립 실행 스크립트다.
 * - .env.local의 내용을 직접 읽거나 출력하지 않는다 — API 키는 항상
 *   `process.env.OPENAI_API_KEY`로만 참조한다. (.env.local을 process.env로
 *   로드하는 것은 실행 명령어의 `--env-file` 옵션이 담당한다.)
 * - 생성 결과는 production 경로(public/assets/3d/)로 자동 복사하지 않는다 —
 *   이번 산출물은 Family v1 PoC이고, 승인은 사람이 직접 한다.
 *
 * 실행 방법은 파일 하단 주석 또는 채팅 답변 참고.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import OpenAI, { APIError } from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs', 'design-system');
const PROMPTS_DIR = path.join(__dirname, 'prompts');
const OUTPUT_DIR = path.join(REPO_ROOT, 'tmp', 'astra-3d');

// astra-image-test.ts와 동일한 모델·reasoning effort.
const MODEL = 'gpt-6-astra';
const REASONING_EFFORT = 'medium';

// Style Master(profile) 생성 때와 동일한 Image Generation Tool 설정 — family 전체가
// 같은 렌더 조건을 공유해야 재질/조명이 흔들리지 않는다.
const IMAGE_MODEL = 'gpt-image-2.5-sunburst';
const IMAGE_SIZE = '1024x1024';
const IMAGE_QUALITY = 'high';
const IMAGE_OUTPUT_FORMAT = 'png';

const STYLE_MASTER_IMAGE = path.join(OUTPUT_DIR, 'profile-poc.png');
const ASSET_DOC = path.join(DOCS_DIR, '3d-assets.md');
const FAMILY_DIRECTOR_PROMPT = path.join(PROMPTS_DIR, 'astra-3d-family-director.md');

const SUBJECT_KEYS = [
  'location',
  'email',
  'education',
  'web',
  'mobile',
  'analytics',
  'laptop',
  'company',
  'team',
  'personal',
] as const;
type SubjectKey = (typeof SUBJECT_KEYS)[number];

function subjectBriefPath(subject: SubjectKey): string {
  return path.join(PROMPTS_DIR, 'subjects', `${subject}.md`);
}

function outputImagePath(subject: SubjectKey): string {
  return path.join(OUTPUT_DIR, `${subject}-poc.${IMAGE_OUTPUT_FORMAT}`);
}

function outputNotesPath(subject: SubjectKey): string {
  return path.join(OUTPUT_DIR, `${subject}-poc.notes.md`);
}

/** 파일 하나를 읽는다. 실패 시 어떤 파일이 문제인지 라벨을 붙여 에러를 다시 던진다. */
async function readInputFile(label: string, filePath: string): Promise<string> {
  try {
    return await readFile(filePath, 'utf-8');
  } catch (error) {
    console.error(`[astra-3d-family] ${label} 파일을 읽을 수 없습니다: ${filePath}`);
    throw error;
  }
}

/**
 * subject 하나에 대한 Responses API 입력을 만든다. 공유 director 프롬프트 + 3d-assets.md
 * (source of truth) + Style Master 실제 이미지(image input) + subject별 브리핑 순서.
 * OpenAI 호출과 분리해두어 API를 실제로 부르지 않고도 이 부분만 단독으로 검증할 수 있다.
 */
export async function buildSubjectInput(subject: SubjectKey): Promise<OpenAI.Responses.ResponseInput> {
  const [directorPrompt, assetDoc, subjectBrief, styleMasterImage] = await Promise.all([
    readInputFile('astra-3d-family-director.md', FAMILY_DIRECTOR_PROMPT),
    readInputFile('3d-assets.md', ASSET_DOC),
    readInputFile(`subjects/${subject}.md`, subjectBriefPath(subject)),
    readFile(STYLE_MASTER_IMAGE).catch((error) => {
      console.error(
        `[astra-3d-family] Style Master 이미지를 찾을 수 없습니다: ${path.relative(REPO_ROOT, STYLE_MASTER_IMAGE)}\n` +
          `  먼저 "npm run astra:image-test"로 profile PoC를 생성해야 합니다.`,
      );
      throw error;
    }),
  ]);

  const sharedText = [
    directorPrompt.trim(),
    '',
    '---',
    '',
    '# 입력 문서: 3d-assets.md',
    '',
    assetDoc.trim(),
    '',
  ].join('\n');

  return [
    {
      role: 'user',
      content: [
        { type: 'input_text', text: sharedText },
        {
          type: 'input_image',
          image_url: `data:image/png;base64,${styleMasterImage.toString('base64')}`,
          detail: 'high',
        },
        { type: 'input_text', text: subjectBrief.trim() },
      ],
    },
  ];
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

/** subject 하나를 생성한다. 실패해도 던지지 않고 결과를 반환한다 — 호출부가 계속 진행할 수 있게. */
async function generateSubject(
  client: OpenAI,
  subject: SubjectKey,
): Promise<{ subject: SubjectKey; ok: true } | { subject: SubjectKey; ok: false; message: string }> {
  console.log(`[astra-3d-family] ${subject} 생성 시작...`);

  try {
    const input = await buildSubjectInput(subject);

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
          // 참고 이미지를 "수정"하는 게 아니라 같은 스타일의 "새" 이미지를 만드는 것이므로
          // edit이 아니라 generate로 명시한다(auto에 맡기지 않는다).
          action: 'generate',
        },
      ],
    });

    const images = extractGeneratedImages(response.output);

    if (images.length === 0) {
      console.error(`[astra-3d-family] ${subject}: 응답에서 image_generation_call 결과를 찾지 못했습니다.`);
      console.error(JSON.stringify(response.output, null, 2));
      return { subject, ok: false, message: 'no image_generation_call in response.output' };
    }

    if (images.length > 1) {
      console.warn(`[astra-3d-family] ${subject}: 이미지가 ${images.length}개 반환됐습니다 — 첫 번째만 저장합니다.`);
    }

    await writeFile(outputImagePath(subject), Buffer.from(images[0], 'base64'));

    const notes = [
      `# Astra 3D Asset Family PoC — ${subject}`,
      '',
      `- model: ${MODEL}`,
      `- reasoning.effort: ${REASONING_EFFORT}`,
      `- style master: ${path.relative(REPO_ROOT, STYLE_MASTER_IMAGE)}`,
      `- image tool model: ${IMAGE_MODEL}`,
      `- size / quality / background / format: ${IMAGE_SIZE} / ${IMAGE_QUALITY} / transparent / ${IMAGE_OUTPUT_FORMAT}`,
      '',
      '## Astra의 판단 (output_text)',
      '',
      response.output_text || '(output_text 없음)',
      '',
    ].join('\n');
    await writeFile(outputNotesPath(subject), notes, 'utf-8');

    console.log(`[Astra 3D Family] ${subject} ✓`);
    return { subject, ok: true };
  } catch (error) {
    let message: string;
    if (error instanceof APIError) {
      message = `API 오류 status=${error.status ?? '(no status)'} message=${error.message}`;
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    console.error(`[Astra 3D Family] ${subject} ✗ — ${message}`);
    return { subject, ok: false, message };
  }
}

/** CLI 인자에서 재생성할 subject만 골라낸다. 유효한 인자가 없으면 6개 전부를 생성한다. */
function resolveTargetSubjects(argv: string[]): SubjectKey[] {
  const requested = argv.filter((arg): arg is SubjectKey => (SUBJECT_KEYS as readonly string[]).includes(arg));
  const unknown = argv.filter((arg) => !(SUBJECT_KEYS as readonly string[]).includes(arg));

  if (unknown.length > 0) {
    console.warn(`[astra-3d-family] 알 수 없는 subject 인자를 무시합니다: ${unknown.join(', ')}`);
  }

  return requested.length > 0 ? requested : [...SUBJECT_KEYS];
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error(
      '[astra-3d-family] OPENAI_API_KEY가 설정되어 있지 않아 실행을 중단합니다. ' +
        '.env.local에 OPENAI_API_KEY를 설정한 뒤 --env-file 옵션과 함께 다시 실행하세요.',
    );
    process.exit(1);
  }

  if (!existsSync(STYLE_MASTER_IMAGE)) {
    console.error(
      `[astra-3d-family] Style Master 이미지가 없습니다: ${path.relative(REPO_ROOT, STYLE_MASTER_IMAGE)}\n` +
        '  먼저 "npm run astra:image-test"를 실행해 profile PoC를 만드세요.',
    );
    process.exit(1);
  }

  const targets = resolveTargetSubjects(process.argv.slice(2));
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log(
    `[astra-3d-family] model="${MODEL}" reasoning.effort="${REASONING_EFFORT}" ` +
      `image_generation(model="${IMAGE_MODEL}", quality="${IMAGE_QUALITY}", background="transparent") 로 ` +
      `${targets.length}개 asset(${targets.join(', ')})을 순서대로 생성합니다...`,
  );

  const client = new OpenAI({ apiKey });

  // 병렬이 아니라 순차 실행한다 — 로그를 읽기 쉽게 유지하고, 동시에 여러 개의 비싼
  // 이미지 생성 요청이 나가는 것을 피한다(비용 통제, §17).
  const results = [];
  for (const subject of targets) {
    results.push(await generateSubject(client, subject));
  }

  const succeeded = results.filter((r) => r.ok).map((r) => r.subject);
  const failed = results.filter((r) => !r.ok) as Array<{ subject: SubjectKey; ok: false; message: string }>;

  console.log('');
  console.log(`[astra-3d-family] 완료: 성공 ${succeeded.length}개, 실패 ${failed.length}개`);
  if (succeeded.length > 0) {
    console.log(`  성공: ${succeeded.join(', ')}`);
  }
  if (failed.length > 0) {
    console.log(`  실패: ${failed.map((f) => `${f.subject}(${f.message})`).join(', ')}`);
    console.log(`  실패한 subject만 다시 생성하려면: npm run astra:3d-family -- ${failed.map((f) => f.subject).join(' ')}`);
    process.exit(1);
  }
}

// 이 파일을 직접 실행했을 때만 main()을 구동한다.
const isDirectRun = path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1] ?? '');
if (isDirectRun) {
  main();
}

/**
 * 실행 방법:
 *   npm run astra:3d-family                 # 7개(location/email/education/web/mobile/analytics/laptop) 전부
 *   npm run astra:3d-family -- location      # location만 다시 생성
 *   npm run astra:3d-family -- web mobile    # 여러 개를 골라서 다시 생성
 *
 * 사전 조건:
 *   - .env.local에 OPENAI_API_KEY가 설정되어 있어야 한다.
 *   - tmp/astra-3d/profile-poc.png(Style Master)가 이미 있어야 한다
 *     (없으면 먼저 `npm run astra:image-test` 실행).
 *
 * 결과는 tmp/astra-3d/<subject>-poc.png(이미지)와 tmp/astra-3d/<subject>-poc.notes.md
 * (Astra의 판단 텍스트)에 subject별로 저장된다. 전부 git에 커밋되지 않는다(.gitignore).
 * production 경로(public/assets/3d/)로는 자동 복사하지 않는다 — 사람이 직접 검토·승인한 뒤
 * 별도 단계에서 옮긴다.
 */
