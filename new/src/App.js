import React, { useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import context from './context.json';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const findResponse = (message) => {
    for (let item of context) {
      let isMatch = item['words'].some(word => message.toLowerCase().includes(word));
      if (isMatch && (!item['required words'] || item['required words'].every(word => message.toLowerCase().includes(word)))) {
        return item['response'];
      }
    }
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
            <div id="robot">
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
