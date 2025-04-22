'use client';

import '../styles/components/ReadMe.scss';
import { useState } from 'react';

interface ReadMeProps {
  setIsProjectCardClicked: (value: boolean) => void;
}
const ReadMe = ({ setIsProjectCardClicked }: ReadMeProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setIsProjectCardClicked(false);
  };

  if (!isOpen) return null;

  return (
    <div className="read-me-modal-wrapper">
      <div className="overlay" onClick={handleClose}></div>
      <div className="read-me-container" onClick={(e) => e.stopPropagation()}>
        모달입니다.
      </div>
    </div>
  );
};

export default ReadMe;
