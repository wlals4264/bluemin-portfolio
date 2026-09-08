// jquery.ripples는 DefinitelyTyped 타입이 없는 구형 jQuery 플러그인이라
// $.fn을 확장하는 최소한의 시그니처만 직접 선언한다.
// https://github.com/sirxemic/jquery.ripples

interface RipplesOptions {
  imageUrl?: string | null;
  resolution?: number;
  dropRadius?: number;
  perturbance?: number;
  interactive?: boolean;
  crossOrigin?: string;
}

type RipplesCommand = 'destroy' | 'pause' | 'play' | 'show' | 'hide';

interface JQuery {
  ripples(options: RipplesOptions): JQuery;
  ripples(command: RipplesCommand): JQuery;
  ripples(property: 'set', key: string, value: unknown): JQuery;
}

declare module 'jquery.ripples' {
  const setup: undefined;
  export default setup;
}
