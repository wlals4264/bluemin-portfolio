import '../styles/components/Nav.scss';

type TitleItem = {
  label: string;
  key: string;
};

type NavProps = {
  titles: TitleItem[];
  sectionRefs: {
    [key: string]: React.RefObject<HTMLDivElement | null>;
  };
};

export default function Nav({ titles, sectionRefs }: NavProps) {
  const handleClick = (title: string) => {
    const targetRef = sectionRefs[title];
    targetRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav-container">
      {titles.map(({ label, key }) => (
        <span key={key} onClick={() => handleClick(key)}>
          {label}
        </span>
      ))}
      <button>Hire me!</button>
    </nav>
  );
}
