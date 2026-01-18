import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ReactMarkdown from 'react-markdown';
import { 
  Send, 
  Mic, 
  Square, 
  Loader2, 
  Hammer, 
  X, 
  Zap, 
  Activity,
  Maximize2,
  Minimize2
} from 'lucide-react';
import './AIly.css';

const AIly = () => {
  const { getAccessTokenSilently } = useAuth0();
  
  // State for Window & Chat
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: `**AIly System Engaged.** I have full access to your business records. 
      
* **Status**: "What's my profit this month?"
* **Action**: "Remind the client at 450 Pine St about their invoice."`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Audio State
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  
  const messagesEndRef = useRef(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  // Auto-scroll logic
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // --- Audio Logic ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];
      mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        await handleVoiceTranscription(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceTranscription = async (blob) => {
    setIsTranscribing(true);
    const formData = new FormData();
    formData.append('file', blob, 'recording.wav');
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('http://127.0.0.1:8000/api/agent/chat/voice', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (data.user_text) {
        setInput(data.user_text);
        await executeChat(data.user_text);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTranscribing(false);
    }
  };

  // --- Chat Logic ---
  const executeChat = async (messageText) => {
    if (!messageText.trim()) return;
    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('http://127.0.0.1:8000/api/agent/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message: messageText })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM_OFFLINE: Check backend connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ailly-root">
      {/* 1. The Growth Window */}
      <div className={`ailly-window ${isOpen ? 'expanded' : 'collapsed'}`}>
        
        {/* Header - visible only when expanded */}
        {isOpen && (
          <div className="ailly-header">
            <div className="header-status">
              <Activity size={14} className="pulse-icon" />
              <span>AILY_V2.1 // ACTIVE</span>
            </div>
            <button className="icon-btn" onClick={() => setIsOpen(false)}>
              <Minimize2 size={18} />
            </button>
          </div>
        )}

        {/* Branding Area */}
        <div className="ailly-branding" onClick={() => !isOpen && setIsOpen(true)}>
           <div className={`avatar-container ${!isOpen ? 'clickable' : ''}`}>
             <Hammer size={isOpen ? 32 : 28} />
             {!isOpen && <div className="online-ping"></div>}
           </div>
           {isOpen && (
             <div className="id-card">
               <h2>AIly</h2>
               <p>INDUSTRIAL ASSISTANT</p>
             </div>
           )}
        </div>

        {/* Chat Area - content only when expanded */}
        {isOpen && (
          <>
            <div className="ailly-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`msg-block ${msg.role}`}>
                  <div className="msg-bubble">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="msg-block assistant">
                  <div className="thinking-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="ailly-controls">
              <form className="input-group" onSubmit={(e) => { e.preventDefault(); executeChat(input); }}>
                <input 
                  placeholder={isTranscribing ? "LISTENING..." : "COMMAND..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTranscribing}
                />
                <button type="submit" disabled={!input.trim() || isLoading}>
                  <Send size={16} />
                </button>
              </form>
              
              <button 
                className={`voice-btn ${isRecording ? 'is-recording' : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTranscribing}
              >
                {isTranscribing ? <Loader2 className="spin" size={18} /> : 
                 isRecording ? <Square size={18} /> : <Mic size={18} />}
                <span>{isRecording ? "STOP RECORDING" : "VOICE COMMAND"}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIly;