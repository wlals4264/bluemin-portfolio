import Image from 'next/image';
import '../styles/components/Introduction.scss';

const Introduction = () => {
  return (
    <div className="introduction-container">
      <div className="introduction-text-box">
        <span>Front-end Developer</span>
        <h1>
          Hello I&apos;m <br /> <span>Kim Jimin</span>
        </h1>
      </div>
      <div className="introduction-image-box">
        <Image
          src="/profile.webp"
          quality={100}
          //   fill
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
