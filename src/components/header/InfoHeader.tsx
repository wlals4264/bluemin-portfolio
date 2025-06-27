import styles from '@/styles/components/InfoHeader.module.scss';

interface InfoHeaderProps {
  title: string;
  className: string;
}
const InfoHeader = ({ title, className }: InfoHeaderProps) => {
  return (
    <div className={`${styles.infoHeader} ${className}`}>
      <h2>{title}</h2>
    </div>
  );
};

export default InfoHeader;
