/**
 * GPT-6 Astra 기반 Component Architecture Proposal CLI.
 *
 * astra-component-review.ts(이미 작성된 코드를 비판)와 반대로, 이 스크립트는 아직
 * 구현하지 않은 리팩토링에 대해 **구체적인 설계안**을 먼저 받는다 — 범위가 크고
 * 신중한 설계가 필요한 컴포넌트(Projects/ProjectCard 등)에 한해 사용한다.
 *
 * current-ui-audit.md(중복 실태) + review-decision.md(확정 규칙) + foundation.md
 * (토큰/Depth Mapping) + GlassSurface.tsx(재사용 가능한 기존 Glass primitive) +
 * 리뷰어 프롬프트(scripts/prompts/component-architecture.md)를 검토 대상 컴포넌트
 * 소스 코드와 함께 하나의 입력으로 묶어 Astra(Responses API)에 설계 제안을 요청하고,
 * 그 결과를 docs/design-system/astra-component-architecture.md에 저장한다.
 *
 * 검토 대상 파일은 CLI 인자로 받는다:
 *   npx tsx --env-file=.env.local scripts/astra-component-architect.ts <file1> <file2> ...
 *
 * - 애플리케이션 코드와는 무관한 독립 실행 스크립트다.
 * - .env.local의 내용을 직접 읽거나 출력하지 않는다 — API 키는 항상
 *   `process.env.OPENAI_API_KEY`로만 참조한다.
 * - 이 스크립트의 산출물은 설계 "제안"이다. 실제 코드 변경은 사람(과 Claude)이
 *   이 제안을 검토한 뒤 별도로 진행한다 — 자동으로 코드를 고치지 않는다.
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
  reviewerPrompt: path.join(__dirname, 'prompts', 'component-architecture.md'),
  currentUiAudit: path.join(DOCS_DIR, 'current-ui-audit.md'),
  reviewDecision: path.join(DOCS_DIR, 'review-decision.md'),
  foundation: path.join(DOCS_DIR, 'foundation.md'),
  glassSurface: path.join(REPO_ROOT, 'src', 'components', 'common', 'surfaces', 'GlassSurface.tsx'),
} as const;

const OUTPUT_FILE = path.join(DOCS_DIR, 'astra-component-architecture.md');

async function readInputFile(label: string, filePath: string): Promise<string> {
  try {
    return await readFile(filePath, 'utf-8');
  } catch (error) {
    console.error(`[astra-component-architect] ${label} 파일을 읽을 수 없습니다: ${filePath}`);
    throw error;
  }
}

/**
 * 리뷰어 프롬프트 + 규칙 문서 3개 + GlassSurface 소스 + 검토 대상 컴포넌트 소스 코드를
 * 하나의 문자열로 합친다. OpenAI 호출과 분리해두어 API를 실제로 부르지 않고도 이
 * 부분만 단독으로 검증할 수 있다.
 */
export async function buildArchitectureInput(targetFiles: string[]): Promise<string> {
  if (targetFiles.length === 0) {
    throw new Error('검토 대상 파일이 하나도 지정되지 않았습니다.');
  }

  const [reviewerPrompt, auditDoc, reviewDecisionDoc, foundationDoc, glassSurfaceSrc] = await Promise.all([
    readInputFile('component-architecture.md', RULE_FILES.reviewerPrompt),
    readInputFile('current-ui-audit.md', RULE_FILES.currentUiAudit),
    readInputFile('review-decision.md', RULE_FILES.reviewDecision),
    readInputFile('foundation.md', RULE_FILES.foundation),
    readInputFile('GlassSurface.tsx', RULE_FILES.glassSurface),
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
    '# 첨부 1: current-ui-audit.md',
    '',
    auditDoc.trim(),
    '',
    '---',
    '',
    '# 첨부 2: review-decision.md',
    '',
    reviewDecisionDoc.trim(),
    '',
    '---',
    '',
    '# 첨부 3: foundation.md',
    '',
    foundationDoc.trim(),
    '',
    '---',
    '',
    '# 첨부 4: GlassSurface.tsx (재사용 가능한 기존 Glass primitive)',
    '',
    '```tsx',
    glassSurfaceSrc.trim(),
    '```',
    '',
    '---',
    '',
    '# 첨부 5: 검토 대상 컴포넌트 소스 코드',
    '',
    ...sourceSections,
  ].join('\n');
}

async function main() {
  const targetFiles = process.argv.slice(2);

  if (targetFiles.length === 0) {
    console.error(
      '[astra-component-architect] 검토 대상 파일을 하나 이상 인자로 전달하세요.\n' +
        '  예: npx tsx --env-file=.env.local scripts/astra-component-architect.ts ' +
        'src/components/projects/ProjectCard.tsx src/styles/components/ProjectCard.scss',
    );
    process.exit(1);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error(
      '[astra-component-architect] OPENAI_API_KEY가 설정되어 있지 않아 실행을 중단합니다. ' +
        '.env.local에 OPENAI_API_KEY를 설정한 뒤 --env-file 옵션과 함께 다시 실행하세요.',
    );
    process.exit(1);
  }

  console.log(`[astra-component-architect] 검토 대상 ${targetFiles.length}개 파일:`);
  targetFiles.forEach((f) => console.log(`  - ${f}`));

  const input = await buildArchitectureInput(targetFiles);

  console.log(`[astra-component-architect] model="${MODEL}" reasoning.effort="high" 로 설계 제안을 요청합니다...`);

  const client = new OpenAI({ apiKey });

  try {
    const response = await client.responses.create({
      model: MODEL,
      input,
      reasoning: { effort: 'high' },
    });

    await writeFile(OUTPUT_FILE, response.output_text, 'utf-8');
    console.log(`[astra-component-architect] 설계 제안을 저장했습니다: ${path.relative(REPO_ROOT, OUTPUT_FILE)}`);
  } catch (error) {
    if (error instanceof APIError) {
      console.error('[astra-component-architect] API 오류가 발생했습니다.');
      console.error(`  status : ${error.status ?? '(no status)'}`);
      console.error(`  message: ${error.message}`);
    } else {
      console.error('[astra-component-architect] 예상하지 못한 오류가 발생했습니다.');
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
 *   npx tsx --env-file=.env.local scripts/astra-component-architect.ts <file1> <file2> ...
 *
 * .env.local에 OPENAI_API_KEY가 설정되어 있어야 한다.
 * 기존 docs/design-system/astra-component-architecture.md가 있으면 덮어쓴다.
 * 산출물은 설계 "제안"일 뿐이다 — 실제 구현은 이 제안을 사람이 검토한 뒤 진행한다.
 */
