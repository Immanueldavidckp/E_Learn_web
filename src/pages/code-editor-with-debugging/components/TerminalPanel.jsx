import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';

const TerminalPanel = () => {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const socketRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    // Initialize xterm.js terminal
    xtermRef.current = new Terminal({
      cursorBlink: true,
      fontFamily: 'monospace',
      fontSize: 14,
      theme: {
        background: '#000000',
        foreground: '#ffffff',
      },
      windowsMode: true,
    });
  
    xtermRef.current.open(terminalRef.current);

    // Get Supabase access token for authentication
    const accessToken = supabase.auth.getSession().then(({ data }) => data?.session?.access_token);

    accessToken.then(token => {
      // Prepare WebSocket URL with token query param if token exists
      const wsUrl = token
        ? `ws://localhost:4000/?token=${encodeURIComponent(token)}`
        : 'ws://localhost:4000/';

      // Connect to backend WebSocket for bash shell
      socketRef.current = new WebSocket(wsUrl);

      socketRef.current.onopen = () => {
        xtermRef.current.write('\x1b[32mConnected to bash shell\x1b[m\r\n');
      };

      socketRef.current.onmessage = (event) => {
        xtermRef.current.write(event.data);
      };

      socketRef.current.onclose = () => {
        xtermRef.current.write('\r\n\x1b[31mDisconnected from bash shell\x1b[m\r\n');
      };

      socketRef.current.onerror = (err) => {
        xtermRef.current.write('\r\n\x1b[31mError: ' + err.message + '\x1b[m\r\n');
      };

      // -------------------------------
      // New: Buffer input until Enter key
      // -------------------------------
      let commandBuffer = '';

      xtermRef.current.onData((data) => {
        if (data === '\r') {  // Enter key
          if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(commandBuffer + '\n');
          }
          xtermRef.current.write('\r\n');
          commandBuffer = '';  // Clear buffer
        } else if (data === '\u007f') {  // Backspace key
          if (commandBuffer.length > 0) {
            commandBuffer = commandBuffer.slice(0, -1);
            xtermRef.current.write('\b \b');  // Erase last character visually
          }
        } else {
          commandBuffer += data;  // Add to buffer
          xtermRef.current.write(data);  // Echo on terminal
        }
      });
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (xtermRef.current) {
        xtermRef.current.dispose();
      }
    };
  }, [user]);
  

  return (
    <div
      ref={terminalRef}
      className="h-48 w-full bg-black rounded-b-lg border-t border-border"
      style={{ fontFamily: 'monospace', fontSize: '14px' }}
    />
  );
};

export default TerminalPanel;
