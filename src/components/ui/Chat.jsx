"use client";
import { X, SendHorizonal } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const textContainerRef = useRef(null);
  const cursorRef = useRef(null);
  
  // Message state
  const [messages, setMessages] = useState([
    { id: 1, text: "It would be good to make a landing page", isUser: false, visible: false, typing: false },
    { id: 2, text: "Of course, we happy. 😎", isUser: true, visible: false, typing: false },
    { id: 3, text: "Great!!! 🤓", isUser: false, visible: false, typing: false }
  ]);

  const typeTextAnimation = (elementId, text) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.innerHTML = "";
    
    const container = document.createElement('div');
    element.appendChild(container);
    
    const tl = gsap.timeline();
    
    let currentText = "";
    
    const typedText = document.createElement('span');
    container.appendChild(typedText);
    
    for (let i = 0; i <= text.length; i++) {
      tl.to({}, {
        duration: 0.05,
        onComplete: () => {
          currentText = text.substring(0, i);
          typedText.innerHTML = currentText;
        }
      });
    }
    
    return tl;
  };

  useEffect(() => {
    const messageTimeline = gsap.timeline();
    
    messageTimeline.add(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === 1 ? { ...msg, typing: true } : msg
      ));
    })
    .to({}, 1.5, {})
    .add(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === 1 ? { ...msg, typing: false, visible: true } : msg
      ));
      setTimeout(() => typeTextAnimation("message-1", messages[0].text), 100); 
    })
    .to({}, 2, {})
    
    .add(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === 2 ? { ...msg, typing: true } : msg
      ));
    })
    .to({}, 1.5, {}) 
    .add(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === 2 ? { ...msg, typing: false, visible: true } : msg
      ));
      setTimeout(() => typeTextAnimation("message-2", messages[1].text), 100); // Reduced from 200ms
    })
    .to({}, 2, {}) 
    
    .add(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === 3 ? { ...msg, typing: true } : msg
      ));
    })
    .to({}, 1.5, {}) 
    .add(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === 3 ? { ...msg, typing: false, visible: true } : msg
      ));
      setTimeout(() => typeTextAnimation("message-3", messages[2].text), 100); 
    })
    .to({}, 1, {})
    .add(() => {
      setTimeout(() => {
        setMessages(messages.map(msg => ({ ...msg, visible: false, typing: false })));
        messageTimeline.restart();
      }, 5000);
    });
    
    return () => {
      messageTimeline.kill();
    };
  }, []);
  
  useEffect(() => {
    let cursorAnimation;
    
    if (cursorRef.current) {
      gsap.killTweensOf(cursorRef.current);
      
      cursorAnimation = gsap.timeline({ repeat: -1 })
        .to(cursorRef.current, { 
          opacity: 0, 
          duration: 0.5, 
          ease: "power1.inOut" 
        })
        .to(cursorRef.current, { 
          opacity: 1, 
          duration: 0.5, 
          ease: "power1.inOut" 
        });
    }

    return () => {
      if (cursorAnimation) {
        cursorAnimation.kill();
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue.length > displayedText.length) {
      const newChar = newValue.charAt(newValue.length - 1);

      const newDisplayText = displayedText + newChar;
      setDisplayedText(newDisplayText);

      setTimeout(() => {
        const charElement = document.getElementById(`char-${newDisplayText.length - 1}`);
        
        if (charElement) {
          gsap.fromTo(
            charElement,
            { opacity: 0, y: -10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.2,
              ease: "power2.out",
            }
          );
        }
      }, 10);
    } else {
      setDisplayedText(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
      const newValue = inputValue + " ";
      setInputValue(newValue);

      const newDisplayText = displayedText + " ";
      setDisplayedText(newDisplayText);

      setTimeout(() => {
        const charElement = document.getElementById(`char-${newDisplayText.length - 1}`);
        
        if (charElement) {
          gsap.fromTo(
            charElement,
            { opacity: 0, y: -10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.2,
              ease: "power2.out",
            }
          );
        }
      }, 10);
    }
  };

  return (
    <div className="max-w-[20vw] p-4 w-full">
      <div className="flex bg-[#0A3E24] border border-[#9BFFB1] justify-between p-4 rounded-lg">
        <p>Customer Chat</p>
        <X size={20} />
      </div>

      <div className="relative mt-4">
        <div className="absolute z-10 space-y-3 w-full" style={{ bottom: "calc(50vh - 300px)" }}>
          <div className={`bg-[#020805] border w-[15vw] border-[#9BFFB1]/30 p-4 font-inter-regular ml-[-3vw] rounded-xl transition-opacity duration-300 ${messages[0].visible || messages[0].typing ? 'opacity-100' : 'opacity-0'}`}>
            {messages[0].typing ? (
              <div className="flex items-center justify-center space-x-2 h-6">
                <div className="typing-dot" style={{
                  width: '4px', 
                  height: '4px', 
                  backgroundColor: '#9BFFB1', 
                  borderRadius: '50%',
                  animation: 'typingBounce 0.8s infinite 0s'
                }}></div>
                <div className="typing-dot" style={{
                  width: '4px', 
                  height: '4px', 
                  backgroundColor: '#9BFFB1', 
                  borderRadius: '50%',
                  animation: 'typingBounce 0.8s infinite 0.2s'
                }}></div>
                <div className="typing-dot" style={{
                  width: '4px', 
                  height: '4px', 
                  backgroundColor: '#9BFFB1', 
                  borderRadius: '50%',
                  animation: 'typingBounce 0.8s infinite 0.4s'
                }}></div>
              </div>
            ) : (
              <p id="message-1" className="min-h-[1.2em]"></p>
            )}
          </div>
          
          <div className={`bg-[#9BFFB1] text-[#030B07] w-[15vw] border border-[#9BFFB1]/30 p-4 ml-[10vw] mt-8 font-inter-regular rounded-xl transition-opacity duration-300 ${messages[1].visible || messages[1].typing ? 'opacity-100' : 'opacity-0'}`}>
            {messages[1].typing ? (
              <div className="flex items-center justify-center space-x-2 h-6">
                <div className="typing-dot" style={{
                  width: '4px', 
                  height: '4px', 
                  backgroundColor: '#030B07', 
                  borderRadius: '50%',
                  animation: 'typingBounce 0.8s infinite 0s'
                }}></div>
                <div className="typing-dot" style={{
                  width: '4px', 
                  height: '4px', 
                  backgroundColor: '#030B07', 
                  borderRadius: '50%',
                  animation: 'typingBounce 0.8s infinite 0.2s'
                }}></div>
                <div className="typing-dot" style={{
                  width: '4px', 
                  height: '4px', 
                  backgroundColor: '#030B07', 
                  borderRadius: '50%',
                  animation: 'typingBounce 0.8s infinite 0.4s'
                }}></div>
              </div>
            ) : (
              <p id="message-2" className="min-h-[1.2em]"></p>
            )}
          </div>
          
          <div className={`bg-[#020805] border w-[15vw] border-[#9BFFB1]/30 p-4 font-inter-regular ml-[-3vw] mt-8 rounded-xl transition-opacity duration-300 ${messages[2].visible || messages[2].typing ? 'opacity-100' : 'opacity-0'}`}>
            {messages[2].typing ? (
              <div className="flex items-center justify-center space-x-2 h-6">
                <div className="typing-dot" style={{
                  width: '4px', 
                  height: '4px', 
                  backgroundColor: '#9BFFB1', 
                  borderRadius: '50%',
                  animation: 'typingBounce 0.8s infinite 0s'
                }}></div>
                <div className="typing-dot" style={{
                  width: '4px', 
                  height: '4px', 
                  backgroundColor: '#9BFFB1', 
                  borderRadius: '50%',
                  animation: 'typingBounce 0.8s infinite 0.2s'
                }}></div>
                <div className="typing-dot" style={{
                  width: '4px', 
                  height: '4px', 
                  backgroundColor: '#9BFFB1', 
                  borderRadius: '50%',
                  animation: 'typingBounce 0.8s infinite 0.4s'
                }}></div>
              </div>
            ) : (
              <p id="message-3" className="min-h-[1.2em]"></p>
            )}
          </div>
        </div>

        <div className="chat bg-[#030B07] border border-[#9BFFB1]/20 h-[50vh] rounded-lg flex flex-col relative">
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes typingBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
              }
              
              .typing-dot {
                display: inline-block;
              }
            `
          }} />
          
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#030B07] flex items-center">
            <div className="relative flex-grow">
              <input
                type="text"
                name="texto"
                id="mensaje"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className=" border border-[#9BFFB1] flex-grow h-10 w-full px-3 rounded-md mr-2 focus:outline-none focus:border-[#9BFFB1] focus:ring-0 focus:ring-[#9BFFB1] text-[#030B07] caret-transparent text-sm font-inter-regular "
              />

              <div
                ref={textContainerRef}
                className="absolute inset-0 flex items-center px-3 pointer-events-none text-[#9BFFB1]/90 text-sm font-inter-regular overflow-hidden"
              >
                {displayedText.split("").map((char, index) => (
                  <span 
                    key={index} 
                    id={`char-${index}`} 
                    className="inline-block"
                    style={{ opacity: 1 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
                <span
                  ref={cursorRef}
                  className="inline-block h-5 w-[2px] bg-[#9BFFB1] ml-[1px]"
                  style={{ opacity: 1 }} 
                />
              </div>
            </div>
            <button className="bg-[#9BFFB1] text-[#030B07] h-10 px-3 ml-2 rounded-md cursor-pointer">
              <SendHorizonal size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
