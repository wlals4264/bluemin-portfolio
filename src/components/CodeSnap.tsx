'use client';

import { useState } from 'react';

import '../styles/components/CodeSnap.scss';

const commands: Record<string, string> = {
  about: 'about-me',
  skills: 'skills',
  archiving: 'archiving',
  projects: 'projects',
  activity: 'activity',
};

const CodeSnap = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    'What are you curious about? [about, skills, archiving, projects, activity]',
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();

    if (trimmed === '') return;

    if (commands[trimmed]) {
      const targetId = commands[trimmed];
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });

      setHistory((prev) => [...prev, `> ${trimmed}`, `Navigating to ${trimmed}...`]);
    } else {
      setHistory((prev) => [...prev, `> ${trimmed}`, `Unknown command: ${trimmed}`]);
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
        {history.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <form className="inputLine" onSubmit={handleCommand}>
        <span>&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your command..."
        />
      </form>
    </div>
  );
};

export default CodeSnap;
