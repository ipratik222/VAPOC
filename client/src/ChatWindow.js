import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from './logo.svg';

import './ChatIcon.css';
import socket from './io'






function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedName,setSelectedName]=useState('');
  
  useEffect(() => {
    socket.on('updateChatBody',(name)=>{
        const chatBody=document.getElementById('chat')
        chatBody.innerText='welcome '+name;
    });

    return()=>{
        socket.off('updateChatBody');
    }
  },[]);

 function  handleSelectChange(event){
    const name = event.target.value;
    socket.emit('selectedName',name);
    setSelectedName(name);
 }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  

  return (
    <>
    <select onChange={handleSelectChange}>
      <option value="pratik">pratik</option>
      <option value="chandni">chandni</option>
      <option value="shivangi">shivangi</option>
    </select>
    <div className="chat-icon-container">
      <div className="chat-icon" onClick={togglePopup}>
        <Logo />
      </div>
      {isOpen && (
        
        <div className="virtual-agent">
        <div className="chat-header">
            <div>
                <img className="hpe-chat-icon"></img>
                <h5>Care Concierge</h5>
            </div>
            <div>
                <h1 className="chat-minimize-icon" onClick={handleClose}></h1>
            </div>
        </div>
        <div className="chat-body" id="chat">
        
        </div>
        <div className="chat-footer">
            <input type='text' name="message" placeholder="Message your Care Concierge..."  id="message" autoFocus />
            <span>0-250</span>
            <button id="send"></button>
        </div>
</div>

          
        
         
      )}
     
    </div>
    </>
    
  );

}

export default ChatWindow;
