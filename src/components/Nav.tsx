import '../styles/components/Nav.scss';

interface NavProps {
  titles: string[];
}

export default function Nav({ titles }: NavProps) {
  return (
    <nav>
      {titles.map((title) => {
        return <span key={title}>{title}</span>;
      })}
      <button>Hire me!</button>
    </nav>
  );
}
