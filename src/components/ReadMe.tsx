'use client';

import { ProjectCard } from '@/mocks/projects';
import '../styles/components/ReadMe.scss';
import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

interface ReadMeProps {
  setIsProjectCardClicked: (value: boolean) => void;
  project: ProjectCard;
}
const ReadMe = ({ setIsProjectCardClicked, project }: ReadMeProps) => {
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
        <header className="modal-header">
          <span>readme.md</span>
          <IoIosClose />
        </header>
        <div className="content-box">{project.title}</div>
      </div>
    </div>
  );
};

export default ReadMe;
