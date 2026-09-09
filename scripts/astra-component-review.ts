/**
 * GPT-6 Astra 기반 Component Migration Reviewer CLI.
 *
 * astra-review.ts(문서 리뷰)와 같은 역할을 실제 컴포넌트 코드에 대해 수행한다.
 * review-decision.md / foundation.md / 3d-assets.md(디자인 시스템 규칙)와
 * 리뷰어 프롬프트(scripts/prompts/component-migration-review.md)를 검토 대상
 * 컴포넌트 소스 코드와 함께 하나의 입력으로 묶어 Astra(Responses API)에 검토를
 * 요청하고, 그 결과를 docs/design-system/astra-component-review.md에 저장한다.
 *
 * 검토 대상 파일은 CLI 인자로 받는다(리팩토링할 섹션마다 다르므로 하드코딩하지 않는다):
 *   npx tsx --env-file=.env.local scripts/astra-component-review.ts <file1> <file2> ...
 *
 * - 애플리케이션 코드와는 무관한 독립 실행 스크립트다.
 * - .env.local의 내용을 직접 읽거나 출력하지 않는다 — API 키는 항상
 *   `process.env.OPENAI_API_KEY`로만 참조한다.
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import OpenAI, { APIError } from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs', 'design-system');

const MODEL = 'gpt-6-astra';

const RULE_FILES = {
  reviewerPrompt: path.join(__dirname, 'prompts', 'component-migration-review.md'),
  reviewDecision: path.join(DOCS_DIR, 'review-decision.md'),
  foundation: path.join(DOCS_DIR, 'foundation.md'),
  assets3d: path.join(DOCS_DIR, '3d-assets.md'),
} as const;

const OUTPUT_FILE = path.join(DOCS_DIR, 'astra-component-review.md');

async function readInputFile(label: string, filePath: string): Promise<string> {
  try {
    return await readFile(filePath, 'utf-8');
  } catch (error) {
    console.error(`[astra-component-review] ${label} 파일을 읽을 수 없습니다: ${filePath}`);
    throw error;
  }
}

/**
 * 리뷰어 프롬프트 + 규칙 문서 3개 + 검토 대상 컴포넌트 소스 코드를 하나의 문자열로 합친다.
 * OpenAI 호출과 분리해두어, API를 실제로 부르지 않고도 이 부분만 단독으로 검증할 수 있다.
 */
export async function buildReviewInput(targetFiles: string[]): Promise<string> {
  if (targetFiles.length === 0) {
    throw new Error('검토 대상 파일이 하나도 지정되지 않았습니다.');
  }

  const [reviewerPrompt, reviewDecisionDoc, foundationDoc, assets3dDoc] = await Promise.all([
    readInputFile('component-migration-review.md', RULE_FILES.reviewerPrompt),
    readInputFile('review-decision.md', RULE_FILES.reviewDecision),
    readInputFile('foundation.md', RULE_FILES.foundation),
    readInputFile('3d-assets.md', RULE_FILES.assets3d),
  ]);

  const sourceSections = await Promise.all(
    targetFiles.map(async (relativePath) => {
      const absolutePath = path.resolve(REPO_ROOT, relativePath);
      const content = await readInputFile(relativePath, absolutePath);
      const ext = path.extname(absolutePath).replace('.', '') || 'text';
      return [`### ${relativePath}`, '', '```' + ext, content.trim(), '```', ''].join('\n');
    }),
  );

  return [
    reviewerPrompt.trim(),
    '',
    '---',
    '',
    '# 규칙 문서 1: review-decision.md',
    '',
    reviewDecisionDoc.trim(),
    '',
    '---',
    '',
    '# 규칙 문서 2: foundation.md',
    '',
    foundationDoc.trim(),
    '',
    '---',
    '',
    '# 규칙 문서 3: 3d-assets.md',
    '',
    assets3dDoc.trim(),
    '',
    '---',
    '',
    '# 검토 대상 컴포넌트 소스 코드',
    '',
    ...sourceSections,
  ].join('\n');
}

async function main() {
  const targetFiles = process.argv.slice(2);

  if (targetFiles.length === 0) {
    console.error(
      '[astra-component-review] 검토 대상 파일을 하나 이상 인자로 전달하세요.\n' +
        '  예: npx tsx --env-file=.env.local scripts/astra-component-review.ts ' +
        'src/components/about-me/AboutMe.tsx src/styles/components/AboutMe.scss',
    );
    process.exit(1);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error(
      '[astra-component-review] OPENAI_API_KEY가 설정되어 있지 않아 실행을 중단합니다. ' +
        '.env.local에 OPENAI_API_KEY를 설정한 뒤 --env-file 옵션과 함께 다시 실행하세요.',
    );
    process.exit(1);
  }

  console.log(`[astra-component-review] 검토 대상 ${targetFiles.length}개 파일:`);
  targetFiles.forEach((f) => console.log(`  - ${f}`));

  const input = await buildReviewInput(targetFiles);

  console.log(`[astra-component-review] model="${MODEL}" reasoning.effort="high" 로 리뷰를 요청합니다...`);

  const client = new OpenAI({ apiKey });

  try {
    const response = await client.responses.create({
      model: MODEL,
      input,
      reasoning: { effort: 'high' },
    });

    await writeFile(OUTPUT_FILE, response.output_text, 'utf-8');
    console.log(`[astra-component-review] 리뷰 결과를 저장했습니다: ${path.relative(REPO_ROOT, OUTPUT_FILE)}`);
  } catch (error) {
    if (error instanceof APIError) {
      console.error('[astra-component-review] API 오류가 발생했습니다.');
      console.error(`  status : ${error.status ?? '(no status)'}`);
      console.error(`  message: ${error.message}`);
    } else {
      console.error('[astra-component-review] 예상하지 못한 오류가 발생했습니다.');
      console.error(error);
    }
    process.exit(1);
  }
}

const isDirectRun = path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1] ?? '');
if (isDirectRun) {
  main();
}

/**
 * 실행 방법:
 *   npx tsx --env-file=.env.local scripts/astra-component-review.ts <file1> <file2> ...
 *
 * .env.local에 OPENAI_API_KEY가 설정되어 있어야 한다.
 * 기존 docs/design-system/astra-component-review.md가 있으면 덮어쓴다(섹션을 리팩토링할
 * 때마다 다시 실행해 최신 검토 결과로 교체하는 방식 — astra-review.ts와 동일한 컨벤션).
 */
