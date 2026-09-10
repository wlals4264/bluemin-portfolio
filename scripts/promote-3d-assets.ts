/**
 * Astra PoC 결과(tmp/astra-3d/<key>-poc.png, astra-3d-family.ts 산출물)를 검사한 뒤,
 * 진짜 alpha transparency가 확인된 것만 production WebP로 변환해
 * public/assets/3d/<info|concepts>/<key>.webp에 저장한다.
 *
 * 핵심 원칙(STEP 9 §2·§3):
 * - "화면상 검게 보인다"는 이유만으로 opaque black background라고 가정하지 않는다 —
 *   PNG의 raw alpha 채널을 직접 읽어서 판단한다(뷰어가 투명 영역을 검게 렌더링하는
 *   것과, 실제로 불투명한 검정 배경이 박혀 있는 것은 다르다).
 * - 이 asset들은 translucent glass material을 쓰기 때문에, 배경이 정말로 baked-in
 *   되어 있는 경우라도 단순 black-threshold 삭제는 쓰지 않는다 — 유리 가장자리의
 *   반투명 셰이딩까지 함께 지워버려 품질이 손상된다. alpha 채널이 정상이면 그대로
 *   리사이즈+포맷 변환만 하고, 비정상이면(모서리가 불투명하거나 alpha 채널 자체가
 *   없으면) **변환을 건너뛰고 이유를 보고한다** — 억지로 손상시키지 않는다.
 *
 * 원본 PNG는 보존한다(이 스크립트는 tmp/astra-3d/의 파일을 절대 수정·삭제하지 않는다).
 *
 * 실행: npm run assets:promote-3d
 */

import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(REPO_ROOT, 'tmp', 'astra-3d');
const PRODUCTION_ROOT = path.join(REPO_ROOT, 'public', 'assets', '3d');

// Icon3D의 가장 큰 semantic size는 hero(160px) — 3x DPR 기준 480px까지 커버해야
// 확대되지 않는다. 512는 그보다 살짝 여유를 둔 값이면서 원본(1024)보다 데이터량은
// 1/4로 줄어든다(공식 문서: 파일 크기 최적화 결과는 실제 파일이 없어 추정하지
// 않기로 했던 이전 단계와 달리, 이제 실제 파일이 있으므로 이번 실행 결과로 확정된다).
const PRODUCTION_SIZE = 512;
const WEBP_QUALITY = 92;
// 유리 가장자리 반투명 디테일이 손상되면 안 되므로 alpha는 최고 정밀도로 유지한다.
const WEBP_ALPHA_QUALITY = 100;

type AssetKey =
  | 'profile'
  | 'location'
  | 'email'
  | 'education'
  | 'web'
  | 'mobile'
  | 'analytics'
  | 'laptop'
  | 'company'
  | 'team'
  | 'personal';
type Category = 'info' | 'concepts';

// 기존 icon3dAssets.ts 구조와 동일한 key→category 매핑을 여기서도 그대로 쓴다
// (scripts/와 src/ 사이의 모듈 해석 리스크를 피하려고 의도적으로 다시 선언했다 —
// 값 자체는 src/mocks/icon3dAssets.ts와 반드시 일치해야 한다).
const ASSETS: Array<{ key: AssetKey; category: Category }> = [
  { key: 'profile', category: 'info' },
  { key: 'location', category: 'info' },
  { key: 'email', category: 'info' },
  { key: 'education', category: 'info' },
  { key: 'web', category: 'concepts' },
  { key: 'mobile', category: 'concepts' },
  { key: 'analytics', category: 'concepts' },
  { key: 'laptop', category: 'concepts' },
  { key: 'company', category: 'concepts' },
  { key: 'team', category: 'concepts' },
  { key: 'personal', category: 'concepts' },
];

type Inspection = {
  key: AssetKey;
  width: number;
  height: number;
  channels: number;
  format: string;
  hasAlpha: boolean;
  cornerAlphas: number[];
  transparentPct: number;
  opaquePct: number;
  pass: boolean;
  reason?: string;
};

function sourcePath(key: AssetKey): string {
  return path.join(SOURCE_DIR, `${key}-poc.png`);
}

function productionPath(key: AssetKey, category: Category): string {
  return path.join(PRODUCTION_ROOT, category, `${key}.webp`);
}

/** raw pixel을 직접 읽어 alpha 채널 상태를 판정한다 — 미리보기 렌더링 결과로 판단하지 않는다. */
async function inspect(key: AssetKey): Promise<Inspection> {
  const image = sharp(sourcePath(key));
  const meta = await image.metadata();
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const total = width * height;

  let transparent = 0;
  let opaque = 0;
  for (let i = 0; i < total; i++) {
    const a = data[i * channels + 3];
    if (a === 0) transparent++;
    if (a === 255) opaque++;
  }

  const cornerCoords: Array<[number, number]> = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];
  const cornerAlphas = cornerCoords.map(([x, y]) => data[(y * width + x) * channels + 3]);
  const cornersTransparent = cornerAlphas.every((a) => a <= 4);
  const transparentPct = (transparent / total) * 100;
  const opaquePct = (opaque / total) * 100;

  let pass = true;
  let reason: string | undefined;
  if (!meta.hasAlpha) {
    pass = false;
    reason = 'alpha channel 없음 — RGB만 있는 이미지(배경이 완전히 baked-in)';
  } else if (!cornersTransparent) {
    pass = false;
    reason = `모서리 픽셀이 불투명함(alpha=${cornerAlphas.join(',')}) — 배경이 baked-in 되어 있을 가능성`;
  } else if (transparentPct < 10) {
    pass = false;
    reason = `투명 픽셀 비율이 비정상적으로 낮음(${transparentPct.toFixed(1)}%)`;
  }

  return {
    key,
    width,
    height,
    channels,
    format: meta.format ?? 'unknown',
    hasAlpha: meta.hasAlpha ?? false,
    cornerAlphas,
    transparentPct,
    opaquePct,
    pass,
    reason,
  };
}

async function convert(key: AssetKey, category: Category): Promise<{ outPath: string; bytes: number }> {
  const outPath = productionPath(key, category);
  await mkdir(path.dirname(outPath), { recursive: true });

  await sharp(sourcePath(key))
    .resize(PRODUCTION_SIZE, PRODUCTION_SIZE, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: WEBP_QUALITY, alphaQuality: WEBP_ALPHA_QUALITY, lossless: false })
    .toFile(outPath);

  const stats = await stat(outPath);
  return { outPath, bytes: stats.size };
}

async function main() {
  console.log(`[promote-3d-assets] 1) 소스 PNG ${ASSETS.length}개 검사 중 (raw alpha channel 직접 확인)...\n`);

  const inspections: Inspection[] = [];
  for (const { key } of ASSETS) {
    if (!existsSync(sourcePath(key))) {
      console.error(`  ${key.padEnd(10)} 소스 파일 없음 — ${path.relative(REPO_ROOT, sourcePath(key))}`);
      inspections.push({
        key,
        width: 0,
        height: 0,
        channels: 0,
        format: 'missing',
        hasAlpha: false,
        cornerAlphas: [],
        transparentPct: 0,
        opaquePct: 0,
        pass: false,
        reason: '파일 없음',
      });
      continue;
    }

    const result = await inspect(key);
    inspections.push(result);
    const status = result.pass ? 'PASS' : `FAIL — ${result.reason}`;
    console.log(
      `  ${key.padEnd(10)} ${result.width}x${result.height} ${result.format} alpha=${result.hasAlpha} ` +
        `corners=[${result.cornerAlphas.join(',')}] transparent=${result.transparentPct.toFixed(1)}% ` +
        `opaque=${result.opaquePct.toFixed(1)}%  → ${status}`,
    );
  }

  const passing = inspections.filter((r) => r.pass);
  const failing = inspections.filter((r) => !r.pass);

  console.log(`\n[promote-3d-assets] 검사 완료: PASS ${passing.length}/${ASSETS.length}, FAIL ${failing.length}/${ASSETS.length}`);

  if (failing.length > 0) {
    console.error(
      '\n[promote-3d-assets] 아래 asset은 transparency가 production 품질로 확인되지 않아 변환을 건너뜁니다' +
        '(손상 위험이 있는 black-threshold 삭제 등으로 억지로 고치지 않습니다):',
    );
    for (const f of failing) {
      console.error(`  - ${f.key}: ${f.reason}`);
    }
  }

  if (passing.length === 0) {
    console.error('\n[promote-3d-assets] 변환 가능한 asset이 없어 종료합니다.');
    process.exit(1);
  }

  console.log(`\n[promote-3d-assets] 2) production WebP 변환 중 (${PRODUCTION_SIZE}x${PRODUCTION_SIZE}, quality=${WEBP_QUALITY}, alphaQuality=${WEBP_ALPHA_QUALITY})...\n`);

  for (const { key, category } of ASSETS) {
    const insp = inspections.find((i) => i.key === key);
    if (!insp?.pass) continue;
    const { outPath, bytes } = await convert(key, category);
    console.log(`  ${key.padEnd(10)} → ${path.relative(REPO_ROOT, outPath)} (${(bytes / 1024).toFixed(1)} KB)`);
  }

  console.log(`\n[promote-3d-assets] 완료: ${passing.length}개 production WebP 생성.`);
  console.log(`[promote-3d-assets] 원본 PNG는 그대로 보존됩니다: ${path.relative(REPO_ROOT, SOURCE_DIR)}/`);

  if (failing.length > 0) {
    process.exitCode = 1;
  }
}

main();
