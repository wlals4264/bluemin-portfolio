import '../styles/components/Nav.scss';

type NavProps = {
  titles: string[];
  sectionRefs: {
    [key: string]: React.RefObject<HTMLDivElement>;
  };
};

export default function Nav({ titles, sectionRefs }: NavProps) {
  const handleClick = (title: string) => {
    const targetRef = sectionRefs[title];
    targetRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav-container">
      {titles.map((title) => (
        <span key={title} onClick={() => handleClick(title)}>
          {title}
        </span>
      ))}
      <button>Hire me!</button>
    </nav>
  );
}
