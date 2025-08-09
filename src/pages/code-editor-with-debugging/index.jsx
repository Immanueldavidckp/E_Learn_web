import React, { useState, useEffect } from 'react';
import FileExplorer from './components/FileExplorer';
import CodeEditor from './components/CodeEditor';
import TerminalPanel from './components/TerminalPanel';

const CodeEditorWithDebugging = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [code, setCode] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex">
          <div className="w-60 bg-surface border-r border-border">
            <FileExplorer onFileSelect={handleFileSelect} selectedFile={selectedFile?.id} />
          </div>
          <div className="flex-1 flex flex-col">
            <CodeEditor selectedFile={selectedFile} onCodeChange={handleCodeChange} />
            <TerminalPanel />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-60 bg-surface border-r border-border">
        <FileExplorer onFileSelect={handleFileSelect} selectedFile={selectedFile?.id} />
      </div>
      <div className="flex-1 flex flex-col">
        <CodeEditor selectedFile={selectedFile} onCodeChange={handleCodeChange} />
        <TerminalPanel />
      </div>
    </div>
  );
};

export default CodeEditorWithDebugging;
