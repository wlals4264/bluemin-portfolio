import '../styles/Nav.scss';

interface NavProps {
  titles: string[];
}
export default function Nav({ titles }: NavProps) {
  return (
    <nav>
      {titles.map((title, index) => {
        return <span key={index}>{title}</span>;
      })}
    </nav>
  );
}
