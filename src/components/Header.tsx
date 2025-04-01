import Nav from './Nav';

export default function Header() {
  const titles = ['About me', 'Skills', 'Archiving', 'Projects', 'Activity'];
  return (
    <>
      <Nav titles={titles} />
    </>
  );
}
