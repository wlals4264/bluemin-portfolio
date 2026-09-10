import '@/styles/components/FeatureList.scss';

type FeatureListProps = {
  features: string[];
  className?: string;
};

/**
 * FeatureList — 프로젝트 피처 불릿 리스트 Atom(Level 2 Content, Glass 아님).
 * 근거: docs/design-system/astra-review.md §12-4(PoC 가정 4번).
 *
 * ProjectCard(카드에서 최대 3개만 미리보기)와 ReadMe(모달에서 전체 목록)가
 * 각자 `.project-card-features` 클래스명을 따로 정의해 패딩·폰트 크기 값이
 * 서서히 벌어지던 것을 하나로 통합한다 — 몇 개를 보여줄지(slice)는 호출부
 * 책임이고, 이 컴포넌트는 주어진 features를 그대로 렌더링만 한다.
 */
const FeatureList = ({ features, className = '' }: FeatureListProps) => {
  if (features.length === 0) return null;

  const classes = ['feature-list', className].filter(Boolean).join(' ');

  return (
    <ul className={classes}>
      {features.map((feature) => (
        <li key={feature}>{feature}</li>
      ))}
    </ul>
  );
};

export default FeatureList;
