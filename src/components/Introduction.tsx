import '../styles/components/Introduction.scss';
import Image from 'next/image';
import IntroductionBtns from './IntroductionBtns';

const Introduction = () => {
  return (
    <div className="introduction-container">
      <div className="introduction-text-box">
        <span>Front-end Developer</span>
        <h1>
          Hello I&apos;m <br /> <span>Kim Jimin</span>
        </h1>
        <p>
          I&apos;m a frontend developer who keeps learning, <br />
          creating, and exploring the endless ocean of the web
        </p>

        <IntroductionBtns />
      </div>
      <div className="introduction-image-box">
        <svg className="rotating-border" viewBox="0 0 340 340">
          <circle cx="170" cy="170" r="160" />
        </svg>
        <Image
          src="/profile.webp"
          quality={100}
          alt="profile image"
          className="profile-image"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default Introduction;
