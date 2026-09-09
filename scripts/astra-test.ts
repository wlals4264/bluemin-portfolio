/**
 * OpenAI GPT-6 Astra (Responses API) 연결 확인용 최소 테스트 스크립트.
 *
 * - 애플리케이션 코드와는 무관한 독립 실행 스크립트다.
 * - .env.local의 내용을 직접 읽거나 출력하지 않는다 — API 키는 항상
 *   `process.env.OPENAI_API_KEY`로만 참조하고, 값 자체는 절대 로그로 남기지 않는다.
 *   (.env.local을 process.env로 로드하는 것은 실행 명령어의 `--env-file` 옵션이 담당한다.)
 *
 * 실행 방법은 파일 하단 주석 또는 채팅 답변 참고.
 */

import OpenAI, { APIError } from 'openai';

const MODEL = 'gpt-6-astra';
const TEST_PROMPT = 'ping';

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error(
      '[astra-test] OPENAI_API_KEY가 설정되어 있지 않습니다. ' +
        '.env.local에 OPENAI_API_KEY를 설정한 뒤, --env-file 옵션과 함께 다시 실행하세요.',
    );
    process.exit(1);
  }

  const client = new OpenAI({ apiKey });

  console.log(`[astra-test] model="${MODEL}" reasoning.effort="medium" 로 요청을 보냅니다...`);

  try {
    const response = await client.responses.create({
      model: MODEL,
      input: TEST_PROMPT,
      reasoning: { effort: 'medium' },
    });

    console.log('[astra-test] 응답 수신 성공:');
    console.log(response.output_text);
  } catch (error) {
    if (error instanceof APIError) {
      console.error('[astra-test] API 오류가 발생했습니다.');
      console.error(`  status : ${error.status ?? '(no status)'}`);
      console.error(`  message: ${error.message}`);
    } else {
      console.error('[astra-test] 예상하지 못한 오류가 발생했습니다.');
      console.error(error);
    }
    process.exit(1);
  }
}

main();
