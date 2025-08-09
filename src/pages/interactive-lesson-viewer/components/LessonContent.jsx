import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const LessonContent = ({ content, onInteractiveClick }) => {
  const [expandedCode, setExpandedCode] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});

  const toggleCodeExpansion = (codeId) => {
    setExpandedCode(prev => ({
      ...prev,
      [codeId]: !prev[codeId]
    }));
  };

  const handleQuizAnswer = (quizId, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [quizId]: answer
    }));
  };

  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={index} className="prose prose-gray max-w-none">
            <div 
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        );

      case 'heading':
        const HeadingTag = `h${block.level}`;
        return (
          <HeadingTag 
            key={index} 
            className={`font-semibold text-foreground ${
              block.level === 2 ? 'text-xl mt-8 mb-4' :
              block.level === 3 ? 'text-lg mt-6 mb-3': 'text-base mt-4 mb-2'
            }`}
          >
            {block.content}
          </HeadingTag>
        );

      case 'image':
        return (
          <div key={index} className="my-6">
            <div className="bg-muted rounded-lg overflow-hidden">
              <Image
                src={block.src}
                alt={block.alt}
                className="w-full h-auto"
              />
            </div>
            {block.caption && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                {block.caption}
              </p>
            )}
          </div>
        );

      case 'video':
        return (
          <div key={index} className="my-6">
            <div className="bg-muted rounded-lg overflow-hidden aspect-video">
              <div className="w-full h-full flex items-center justify-center">
                <Button
                  variant="default"
                  iconName="Play"
                  onClick={() => console.log('Play video:', block.src)}
                >
                  Play Video
                </Button>
              </div>
            </div>
            {block.caption && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                {block.caption}
              </p>
            )}
          </div>
        );

      case 'code':
        const isExpanded = expandedCode[block.id];
        return (
          <div key={index} className="my-6">
            <div className="bg-muted border border-border rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Code" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {block.language || 'Code'}
                  </span>
                  {block.title && (
                    <span className="text-sm text-muted-foreground">
                      - {block.title}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Copy"
                    onClick={() => navigator.clipboard.writeText(block.content)}
                  >
                    Copy
                  </Button>
                  {block.expandable && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                      onClick={() => toggleCodeExpansion(block.id)}
                    >
                      {isExpanded ? "Collapse" : "Expand"}
                    </Button>
                  )}
                </div>
              </div>
              <div className={`${isExpanded || !block.expandable ? 'block' : 'hidden'}`}>
                <pre className="p-4 text-sm font-mono text-foreground overflow-x-auto">
                  <code>{block.content}</code>
                </pre>
              </div>
            </div>
          </div>
        );

      case 'interactive':
        return (
          <div key={index} className="my-6">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Zap" size={20} className="text-accent" />
                <h4 className="font-medium text-foreground">Try It Yourself</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {block.description}
              </p>
              <Button
                variant="default"
                iconName="ExternalLink"
                onClick={() => onInteractiveClick(block)}
              >
                {block.buttonText || "Launch Interactive"}
              </Button>
            </div>
          </div>
        );

      case 'quiz':
        const userAnswer = quizAnswers[block.id];
        const isCorrect = userAnswer === block.correctAnswer;
        const hasAnswered = userAnswer !== undefined;

        return (
          <div key={index} className="my-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="HelpCircle" size={20} className="text-primary" />
                <h4 className="font-medium text-foreground">Quick Check</h4>
              </div>
              <p className="text-foreground mb-4">{block.question}</p>
              
              <div className="space-y-2">
                {block.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleQuizAnswer(block.id, optionIndex)}
                    className={`w-full text-left p-3 rounded-lg border transition-smooth ${
                      hasAnswered
                        ? optionIndex === block.correctAnswer
                          ? 'border-success bg-success/10 text-success'
                          : optionIndex === userAnswer && !isCorrect
                          ? 'border-destructive bg-destructive/10 text-destructive' :'border-border bg-muted text-muted-foreground'
                        : userAnswer === optionIndex
                        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary hover:bg-muted'
                    }`}
                    disabled={hasAnswered}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span>{option}</span>
                      {hasAnswered && optionIndex === block.correctAnswer && (
                        <Icon name="CheckCircle" size={16} className="ml-auto text-success" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              {hasAnswered && (
                <div className={`mt-4 p-3 rounded-lg ${
                  isCorrect ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                }`}>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={isCorrect ? "CheckCircle" : "XCircle"} 
                      size={16} 
                    />
                    <span className="font-medium">
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{block.explanation}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'diagram':
        return (
          <div key={index} className="my-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{block.title}</h4>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ExternalLink"
                  onClick={() => onInteractiveClick(block)}
                >
                  Open in Simulator
                </Button>
              </div>
              <div className="bg-muted rounded-lg overflow-hidden aspect-video">
                <Image
                  src={block.src}
                  alt={block.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              {block.description && (
                <p className="text-sm text-muted-foreground mt-3">
                  {block.description}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {content.map((block, index) => renderContentBlock(block, index))}
    </div>
  );
};

export default LessonContent;