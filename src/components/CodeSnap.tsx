'use client';

import '../styles/components/CodeSnap.scss';
import { RefObject, useEffect, useRef, useState } from 'react';

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

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();

    if (trimmed === '') return;

    const sectionName = trimmed as SectionName;

    if (sectionRefs[sectionName]) {
      sectionRefs[sectionName]?.current?.scrollIntoView({ behavior: 'smooth' });

      setHistory((prevHistory) => [...prevHistory, `> ${sectionName}`, `Navigating to ${sectionName}...`]);
      setError('');
    } else {
      setHistory((prevHistory) => [...prevHistory, `> ${trimmed}`, `Unknown command: "${trimmed}"`]);
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
        <div ref={mainRef} className="main">
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
