import React, { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import type { FC } from 'react';
import type { Message } from '../types';
import { createChat } from '../services/geminiService';
import { useSection } from '../contexts/SectionContext';
import type { Chat } from '@google/genai';

const ChatBubble: FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === 'user';
  const textRef = useRef<HTMLParagraphElement>(null);

  // A simple way to check if the text contains code-like content
  const isCode = message.text.includes('```');

  return (
    <div className={`flex items-start gap-2.5 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <span className="text-2xl mt-1">🌱</span>}
      <div
        className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 shadow-sm ${
          isUser 
            ? 'bg-agri-blue text-white rounded-br-none' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
        }`}
      >
        <p ref={textRef} className={`text-sm break-words ${isCode ? 'whitespace-pre-wrap font-mono text-xs' : ''}`}>{message.text}</p>
      </div>
    </div>
  );
};

const TypingIndicator: FC = () => (
    <div className="flex items-start gap-2.5 animate-fade-in">
        <span className="text-2xl mt-1">🌱</span>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl px-4 py-3 rounded-bl-none shadow-sm">
            <div className="flex items-center space-x-1.5 h-[20px]">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </div>
    </div>
);


const AIAssistant: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 'initial', text: "Hello! I'm AgriBot. I can answer your questions about AgriBlu's technology and sustainable farming. How can I help you?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const { visibleSection } = useSection();

    const scrollToBottom = useCallback(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    },[]);

    useEffect(() => {
        if(isOpen) {
            setTimeout(scrollToBottom, 100);
        }
    }, [messages, isOpen, scrollToBottom]);
    
    useEffect(() => {
        if (isOpen && !chat) {
            setChat(createChat());
        }
    }, [isOpen, chat]);

    const SUGGESTED_PROMPTS: { [key: string]: string[] } = {
        'home': ["What is AgriBlu?", "What problem does AgriBlu solve?", "Tell me about CEA farming."],
        'why': ["Explain the energy problem in vertical farming.", "How much energy does AgriBlu save?", "Why is energy efficiency important?"],
        'technology': ["How does mist delivery work?", "What kind of data do you monitor?", "What makes the system 'intelligent'?"],
        'benefits': ["What are the main benefits?", "How much water is saved?", "Explain the faster growth benefit."],
        'contact': ["How do I request a demo?", "Can I partner with AgriBlu?"],
        'default': ["What is aeroponics?", "Is vertical farming sustainable?", "Tell me a fun fact about plants."]
    };

    const handleSendMessage = useCallback(async (messageText: string) => {
        if (!messageText.trim() || isLoading || !chat) return;

        const userMessage: Message = { id: Date.now().toString(), text: messageText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        
        try {
            const stream = await chat.sendMessageStream({ message: messageText });
            
            let aiResponseText = '';
            let aiMessageId = '';

            for await (const chunk of stream) {
                aiResponseText += chunk.text;
                if (!aiMessageId) {
                    aiMessageId = `${Date.now()}-ai`;
                     setMessages(prev => [...prev, { id: aiMessageId, text: aiResponseText, sender: 'ai' }]);
                } else {
                     setMessages(prev => prev.map(m => 
                        m.id === aiMessageId ? { ...m, text: aiResponseText } : m
                    ));
                }
            }
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = { id: `${Date.now()}-err`, text: "Sorry, I couldn't connect to my brain right now. Please try again later.", sender: 'ai' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [chat, isLoading]);
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
        setInput('');
    };
    
    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
        handleSendMessage(prompt);
        setInput('');
    }

    const currentPrompts = SUGGESTED_PROMPTS[visibleSection] || SUGGESTED_PROMPTS.default;

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-agri-blue text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-cyan-500 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-offset-agri-dark"
                    aria-label="Toggle AI Assistant"
                >
                    <span className="text-3xl transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg) scale(0.7)' : 'rotate(0) scale(1)' }}>
                        {isOpen ? '✕' : '💬'}
                    </span>
                </button>
            </div>
            
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[60vh] max-h-[500px] z-50 bg-white dark:bg-brand-gray-darker rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-in-up border border-gray-200 dark:border-gray-700">
                    <header className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                        <h3 className="font-bold text-gray-800 dark:text-white text-lg flex items-center gap-2">
                           <span className="text-2xl">🌱</span> AgriBot Assistant
                        </h3>
                    </header>

                    <main className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-brand-gray-darker">
                        {messages.length === 1 && !isLoading && (
                            <div className="animate-fade-in">
                                {messages[0] && <ChatBubble key={messages[0].id} message={messages[0]} />}
                                <div className="mt-4 border-t border-gray-200 dark:border-gray-600 pt-3">
                                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Suggestions for you:</p>
                                  <div className="flex flex-wrap gap-2">
                                      {currentPrompts.map(prompt => (
                                          <button 
                                            key={prompt} 
                                            onClick={() => handlePromptClick(prompt)}
                                            className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                          >
                                            {prompt}
                                          </button>
                                      ))}
                                  </div>
                                </div>
                            </div>
                        )}

                        {messages.length > 1 && messages.map(msg => <ChatBubble key={msg.id} message={msg} />)}
                        
                        {isLoading && <TypingIndicator />}
                        <div ref={chatEndRef} />
                    </main>

                    <footer className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
                        <form onSubmit={handleSubmit} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about farming..."
                                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-agri-blue border-transparent"
                                disabled={isLoading}
                                aria-label="Chat input"
                            />
                            <button type="submit" disabled={isLoading || !input.trim()} className="bg-agri-blue text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-cyan-500 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-agri-blue" aria-label="Send message">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </form>
                    </footer>
                </div>
            )}
        </>
    );
};

export default AIAssistant;