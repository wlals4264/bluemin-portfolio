'use client';

import '../styles/components/CodeSnap.scss';
import { RefObject, useState } from 'react';

type SectionName = 'about' | 'skills' | 'projects' | 'experiences';

interface CodeSnapProps {
  sectionRefs: {
    [key in SectionName]: RefObject<HTMLDivElement | null>;
  };
}
const CodeSnap = ({ sectionRefs }: CodeSnapProps) => {
  const defaultPrompt = 'What are you curious about? [about, skills, projects, experiences]';
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([defaultPrompt]);
  const [error, setError] = useState('');

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();

    if (trimmed === '') return;

    const sectionName = trimmed as SectionName;

    if (sectionRefs[sectionName]) {
      sectionRefs[sectionName]?.current?.scrollIntoView({ behavior: 'smooth' });

      setHistory((prevHistory) => [
        ...prevHistory, // 기존 히스토리 유지
        `> ${sectionName}`,
        `Navigating to ${sectionName}...`,
      ]);
      setError('');
    } else {
      setHistory((prevHistory) => [
        ...prevHistory, // 기존 히스토리 유지
        `> ${trimmed}`,
        `Unknown command: "${trimmed}"`, // 오류 메시지를 history에 포함
      ]);
    }

    setInput('');
  };

  return (
    <div className="terminal">
      <div className="header">
        <span className={`dot red`} />
        <span className={`dot yellow`} />
        <span className={`dot green`} />
      </div>

      <div className="body">
        <div className="main">
          {/* <div> 'What are you curious about? [about, skills, archiving, projects, activity]'</div> */}
          {history.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          {error && <div className="error">{error}</div>}
        </div>

        <form className="inputLine" onSubmit={handleCommand}>
          <span>&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError('');
            }}
            placeholder="Type your command..."
          />
        </form>
      </div>
    </div>
  );
};

export default CodeSnap;
