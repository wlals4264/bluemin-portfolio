import '../styles/components/Experiences.scss';
import InfoHeader from './InfoHeader';

const Experiences = () => {
  return (
    <div className="experiences-container">
      <InfoHeader title="Experiences" className="experiences-header" />
      <div className="experiences-content-container">
        <div className="experiences-nav-btn-box">
          <button>Education</button>
          <button>Career Path</button>
          <button>Others</button>
        </div>
        <div className="experiences-box">content</div>
      </div>
    </div>
  );
};

export default Experiences;
