import { ReactNode } from 'react';

import '@/styles/design-system/DesignSystemSection.scss';

type DesignSystemSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
};

/**
 * /design-system 페이지 전용 섹션 셸. Documentation 전용 스타일이며
 * production component(GlassSurface 등)와는 스타일 파일을 분리해 관리한다.
 */
const DesignSystemSection = ({ id, eyebrow, title, description, children }: DesignSystemSectionProps) => {
  return (
    <section id={id} className="ds-section">
      <header className="ds-section__header">
        <p className="ds-section__eyebrow">{eyebrow}</p>
        <h2 className="ds-section__title">{title}</h2>
        {description ? <p className="ds-section__description">{description}</p> : null}
      </header>
      {children}
    </section>
  );
};

export default DesignSystemSection;
