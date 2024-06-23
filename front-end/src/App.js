import React, { useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const findResponse = (message) => {
    return "Sorry, I don't understand that.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    const botResponse = findResponse(input);
    const botMessage = { sender: 'bot', text: botResponse };
    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div id="main">
      <h2>Kukharka Bot</h2>
      <div id="msg_area">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div id={msg.sender === 'bot' ? "robot": "user"}>
              {msg.sender === 'bot' && <div id="bot"></div>}

              <h3>{msg.text}</h3>
            </div>
          </div>
        ))}
      </div>
      <div id="input">
        <input
          type="text"
          placeholder="Write me a message"
          id="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button id="send" onClick={handleSend}>
          <i className="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default App;
