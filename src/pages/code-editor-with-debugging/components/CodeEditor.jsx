import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CodeEditor = ({ selectedFile, onCodeChange }) => {
  const [code, setCode] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [isModified, setIsModified] = useState(false);
  const textareaRef = useRef(null);

  const codeTemplates = {
    'main.c': `#include <stdio.h>
#include <avr/io.h>
#include <util/delay.h>

// Pin definitions
#define LED_PIN PB5
#define BUTTON_PIN PD2

// Function prototypes
void setup_gpio(void);
void toggle_led(void);

int main(void) {
    // Initialize GPIO
    setup_gpio();
    
    // Main loop
    while(1) {
        // Check button state
        if (!(PIND & (1 << BUTTON_PIN))) {
            toggle_led();
            _delay_ms(200); // Debounce delay
        }
        
        _delay_ms(10);
    }
    
    return 0;
}

void setup_gpio(void) {
    // Set LED pin as output
    DDRB |= (1 << LED_PIN);
    
    // Set button pin as input with pull-up
    DDRD &= ~(1 << BUTTON_PIN);
    PORTD |= (1 << BUTTON_PIN);
}

void toggle_led(void) {
    PORTB ^= (1 << LED_PIN);
}`,
    'blink_led.c': `#include <avr/io.h>
#include <util/delay.h>

#define LED_PIN PB5
#define DELAY_MS 1000

int main(void) {
    // Set LED pin as output
    DDRB |= (1 << LED_PIN);
    
    while(1) {
        // Turn LED on
        PORTB |= (1 << LED_PIN);
        _delay_ms(DELAY_MS);
        
        // Turn LED off
        PORTB &= ~(1 << LED_PIN);
        _delay_ms(DELAY_MS);
    }
    
    return 0;
}`,
    'config.h': `#ifndef CONFIG_H
#define CONFIG_H

// System configuration
#define F_CPU 16000000UL  // 16MHz clock frequency

// Pin definitions
#define LED_RED_PIN    PB0
#define LED_GREEN_PIN  PB1
#define LED_BLUE_PIN   PB2

#define BUTTON_1_PIN   PD2
#define BUTTON_2_PIN   PD3

// ADC channels
#define TEMP_SENSOR_CH  0
#define LIGHT_SENSOR_CH 1

// Communication settings
#define BAUD_RATE 9600
#define UART_BUFFER_SIZE 64

// Timer settings
#define TIMER_PRESCALER 64
#define PWM_FREQUENCY 1000

#endif // CONFIG_H`
  };

  useEffect(() => {
    if (selectedFile && codeTemplates[selectedFile.name]) {
      setCode(codeTemplates[selectedFile.name]);
      setIsModified(false);
    }
  }, [selectedFile]);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    setIsModified(true);
    onCodeChange && onCodeChange(newCode);
    
    // Update cursor position
    const textarea = textareaRef.current;
    if (textarea) {
      const lines = newCode.substring(0, textarea.selectionStart).split('\n');
      setCursorPosition({
        line: lines.length,
        column: lines[lines.length - 1].length + 1
      });
    }
  };

  const handleKeyDown = (e) => {
    // Handle Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setIsModified(true);
      
      // Set cursor position after tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const insertSnippet = (snippet) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + snippet + code.substring(end);
      setCode(newCode);
      setIsModified(true);
      
      // Focus back to textarea
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + snippet.length;
      }, 0);
    }
  };

  const codeSnippets = [
    { label: 'for loop', code: 'for(int i = 0; i < 10; i++) {\n    \n}' },
    { label: 'if statement', code: 'if() {\n    \n}' },
    { label: 'function', code: 'void function_name(void) {\n    \n}' },
    { label: 'delay', code: '_delay_ms(1000);' }
  ];

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-3">
          {selectedFile && (
            <>
              <Icon name="FileCode" size={16} className="text-primary" />
              <span className="font-medium text-foreground">
                {selectedFile.name}
                {isModified && <span className="text-accent ml-1">●</span>}
              </span>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Code Snippets */}
          <div className="flex items-center space-x-1">
            {codeSnippets.map((snippet, index) => (
              <button
                key={index}
                onClick={() => insertSnippet(snippet.code)}
                className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-smooth"
                title={`Insert ${snippet.label}`}
              >
                {snippet.label}
              </button>
            ))}
          </div>
          
          <div className="w-px h-4 bg-border"></div>
          
          {/* Editor Actions */}
          <button
            className="p-1 rounded hover:bg-muted transition-smooth"
            title="Format Code"
          >
            <Icon name="AlignLeft" size={16} className="text-muted-foreground" />
          </button>
          <button
            className="p-1 rounded hover:bg-muted transition-smooth"
            title="Find & Replace"
          >
            <Icon name="Search" size={16} className="text-muted-foreground" />
          </button>
          <button
            className="p-1 rounded hover:bg-muted transition-smooth"
            title="Toggle Word Wrap"
          >
            <Icon name="WrapText" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 relative">
        {selectedFile ? (
          <div className="h-full flex">
            {/* Line Numbers */}
            <div className="w-12 bg-muted/50 border-r border-border flex flex-col text-xs text-muted-foreground font-mono">
              {code.split('\n').map((_, index) => (
                <div key={index} className="px-2 py-0.5 text-right">
                  {index + 1}
                </div>
              ))}
            </div>
            
            {/* Code Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={handleCodeChange}
              onKeyDown={handleKeyDown}
              className="flex-1 p-4 bg-transparent text-foreground font-mono text-sm resize-none outline-none"
              style={{ 
                lineHeight: '1.5',
                tabSize: 4,
                fontFamily: 'JetBrains Mono, monospace'
              }}
              spellCheck={false}
              placeholder="Start typing your code here..."
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="FileCode" size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No file selected</p>
              <p className="text-sm">Select a file from the explorer to start coding</p>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
          <span>UTF-8</span>
          <span>C/C++</span>
          {selectedFile && <span>{selectedFile.size}</span>}
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Icon name="CheckCircle" size={14} className="mr-1 text-success" />
            No Issues
          </span>
          <span>Spaces: 4</span>
          <span>Auto Save: On</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;