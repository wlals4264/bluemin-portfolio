/**
 * GPT-6 Astra 기반 Design System Reviewer CLI.
 *
 * docs/design-system의 세 문서(current-ui-audit.md / visual-direction.md /
 * foundation.md)와 리뷰어 프롬프트(scripts/prompts/design-system-review.md)를
 * 하나의 입력으로 묶어 Astra(Responses API)에 검토를 요청하고, 그 결과를
 * docs/design-system/astra-review.md에 저장한다.
 *
 * - 애플리케이션 코드와는 무관한 독립 실행 스크립트다.
 * - .env.local의 내용을 직접 읽거나 출력하지 않는다 — API 키는 항상
 *   `process.env.OPENAI_API_KEY`로만 참조한다. (.env.local을 process.env로
 *   로드하는 것은 실행 명령어의 `--env-file` 옵션이 담당한다.)
 *
 * 실행 방법은 파일 하단 주석 또는 채팅 답변 참고.
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import OpenAI, { APIError } from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs', 'design-system');

const MODEL = 'gpt-6-astra';

const INPUT_FILES = {
  audit: path.join(DOCS_DIR, 'current-ui-audit.md'),
  visualDirection: path.join(DOCS_DIR, 'visual-direction.md'),
  foundation: path.join(DOCS_DIR, 'foundation.md'),
  reviewerPrompt: path.join(__dirname, 'prompts', 'design-system-review.md'),
} as const;

const OUTPUT_FILE = path.join(DOCS_DIR, 'astra-review.md');

/** 입력 파일 하나를 읽는다. 실패 시 어떤 파일이 문제인지 명확히 알 수 있게 라벨을 붙여 에러를 다시 던진다. */
async function readInputFile(label: string, filePath: string): Promise<string> {
  try {
    return await readFile(filePath, 'utf-8');
  } catch (error) {
    console.error(`[astra-review] ${label} 파일을 읽을 수 없습니다: ${filePath}`);
    throw error;
  }
}

/**
 * 리뷰어 프롬프트 + 세 디자인 문서를 하나의 문자열로 합쳐 Astra에 보낼 입력을 만든다.
 * OpenAI 호출과 분리해두어, API를 실제로 부르지 않고도 이 부분만 단독으로 검증할 수 있다.
 */
export async function buildReviewInput(): Promise<string> {
  const [reviewerPrompt, auditDoc, visualDirectionDoc, foundationDoc] = await Promise.all([
    readInputFile('design-system-review.md', INPUT_FILES.reviewerPrompt),
    readInputFile('current-ui-audit.md', INPUT_FILES.audit),
    readInputFile('visual-direction.md', INPUT_FILES.visualDirection),
    readInputFile('foundation.md', INPUT_FILES.foundation),
  ]);

  return [
    reviewerPrompt.trim(),
    '',
    '---',
    '',
    '# 입력 문서 1: current-ui-audit.md',
    '',
    auditDoc.trim(),
    '',
    '---',
    '',
    '# 입력 문서 2: visual-direction.md',
    '',
    visualDirectionDoc.trim(),
    '',
    '---',
    '',
    '# 입력 문서 3: foundation.md',
    '',
    foundationDoc.trim(),
    '',
  ].join('\n');
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error(
      '[astra-review] OPENAI_API_KEY가 설정되어 있지 않아 실행을 중단합니다. ' +
        '.env.local에 OPENAI_API_KEY를 설정한 뒤 --env-file 옵션과 함께 다시 실행하세요.',
    );
    process.exit(1);
  }

  console.log('[astra-review] 입력 문서 4개를 읽는 중...');
  const input = await buildReviewInput();

  console.log(`[astra-review] model="${MODEL}" reasoning.effort="high" 로 리뷰를 요청합니다...`);

  const client = new OpenAI({ apiKey });

  try {
    const response = await client.responses.create({
      model: MODEL,
      input,
      reasoning: { effort: 'high' },
    });

    await writeFile(OUTPUT_FILE, response.output_text, 'utf-8');
    console.log(`[astra-review] 리뷰 결과를 저장했습니다: ${path.relative(REPO_ROOT, OUTPUT_FILE)}`);
  } catch (error) {
    if (error instanceof APIError) {
      console.error('[astra-review] API 오류가 발생했습니다.');
      console.error(`  status : ${error.status ?? '(no status)'}`);
      console.error(`  message: ${error.message}`);
    } else {
      console.error('[astra-review] 예상하지 못한 오류가 발생했습니다.');
      console.error(error);
    }
    process.exit(1);
  }
}

// 이 파일을 직접 실행했을 때만 main()을 구동한다 — buildReviewInput()을
// 다른 스크립트/테스트에서 import해서 쓸 때는 API 호출이 함께 실행되지 않도록 한다.
const isDirectRun = path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1] ?? '');
if (isDirectRun) {
  main();
}

/**
 * 실행 방법:
 *   npx tsx --env-file=.env.local scripts/astra-review.ts
 *
 * .env.local에 OPENAI_API_KEY가 설정되어 있어야 한다.
 * 기존 docs/design-system/astra-review.md가 있으면 덮어쓴다.
 */
