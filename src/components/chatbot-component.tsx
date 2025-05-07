
"use client"
// components/ResumeAIChatbot.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, Minimize2,  Send, Bot, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import useResumeChat from "@/services/resume-service";

// Define types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  // citations?: {
  //   source: string;
  //   text: string;
  // }[];
}

interface SuggestedQuestion {
  id: string;
  text: string;
}

const COMMON_RECRUITER_QUESTIONS: SuggestedQuestion[] = [
  { id: '1', text: 'Tell me about your background?' },
  { id: '2', text: 'What technologies are you most experienced with?' },
  { id: '3', text: 'What was your most challenging project?' },
  { id: '4', text: 'Why are you interested in this position?' },
  { id: '5', text: 'What are your strengths and weaknesses?' },
  { id: '6', text: 'Where do you see yourself in 5 years?' },
  { id: '7', text: 'Tell me about your leadership experience?' },
  { id: '8', text: 'How do you handle tight deadlines?' },
  { id: '9', text: 'What salary are you expecting?' },
  // { id: '10', text: 'Do you have any questions for me?' },
  { id: '11', text: 'How do you keep up with industry trends?' },
  { id: '12', text: 'Describe a situation where you had to resolve a conflict' },
];

const ResumeAIChatbot: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      content: "Hello! I'm Roy Arora's AI assistant trained on his resume. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<SuggestedQuestion[]>(
    COMMON_RECRUITER_QUESTIONS.slice(0, 3)
  );
  const [resumeFileName, setResumeFileName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Use our resume chatbot service
  const { 
    resumeData, 
    isProcessing, 
    error, 
    processResumeFile, 
    askQuestion 
  } = useResumeChat();

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get response from AI service
      const response = await askQuestion(content);
      
      // Add bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response?.content ?? "",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      // Update suggested questions
      rotateSuggestedQuestions();
    } catch (err) {
      console.error('Error getting response:', err);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error while processing your question. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file upload
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    setResumeFileName(file.name);
    
    try {
      // Process the resume file
      const data = await processResumeFile(file);
      
      if (data) {
        // Add confirmation message
        const botMessage: Message = {
          id: Date.now().toString(),
          content: `Thank you for uploading "${file.name}". I've analyzed this resume and can now answer questions about the candidate's experience, skills, and qualifications.`,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
      } else if (error) {
        // Add error message
        const errorMessage: Message = {
          id: Date.now().toString(),
          content: error,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (err) {
      console.error('Error uploading resume:', err);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm sorry, I encountered an error while processing the resume. Please try again with a different file.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle clicking on a suggested question
  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  // Rotate suggested questions
  const rotateSuggestedQuestions = () => {
    // Get 3 random questions that aren't currently displayed
    const availableQuestions = COMMON_RECRUITER_QUESTIONS.filter(
      q => !suggestedQuestions.some(sq => sq.id === q.id)
    );
    
    if (availableQuestions.length >= 3) {
      const newQuestions = availableQuestions.sort(() => 0.5 - Math.random()).slice(0, 3);
      setSuggestedQuestions(newQuestions);
    } else {
      // If we've gone through most questions, reset and get new random ones
      const newQuestions = COMMON_RECRUITER_QUESTIONS
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setSuggestedQuestions(newQuestions);
    }
  };

  // Toggle chatbot open/closed
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  // Toggle minimize/maximize
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Handle file input click
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot button when closed */}
      {!isOpen && (
        <Button 
          onClick={toggleChatbot}
          className={`rounded-full w-16 h-16 flex items-center justify-center shadow-lg ${
            isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          <Bot size={24} className="text-white" />
        </Button>
      )}
      
      {/* Chatbot window when open */}
      {isOpen && (
        <Card className={`w-80 md:w-96 shadow-lg border overflow-hidden flex flex-col ${
          isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
        }`}>
          {/* Header */}
          <CardHeader className={`py-3 px-4 flex flex-row items-center justify-between space-y-0 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center">
              <Avatar className={`h-8 w-8 mr-2 ${
                isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <Bot size={18} className="text-white" />
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">{`Roy Arora's AI Assistant`}</h3>
                {isLoading && <p className="text-xs opacity-70">Typing...</p>}
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleMinimize}>
                {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleChatbot}>
                <Minimize2 size={16} />
              </Button>
            </div>
          </CardHeader>
          
          {/* Chat content */}
          {!isMinimized && (
            <>
              <CardContent className="p-0 flex-1">
                <ScrollArea className={`h-[350px] p-4 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex mb-4 ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          msg.sender === 'user'
                            ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                            : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        
                        {/* Show citations if available */}
                        {/* {msg.citations && msg.citations.length > 0 && (
                          <div className={`mt-2 pt-2 border-t ${
                            isDarkMode ? 'border-gray-600' : 'border-gray-300'
                          } border-opacity-20`}>
                            {msg.citations.map((citation, idx) => (
                              <div key={idx} className="text-xs mt-1 opacity-70">
                                <span className="font-medium">{citation.source}:</span> {citation.text}
                              </div>
                            ))}
                          </div>
                        )} */}
                        
                        <p className="text-xs opacity-70 mt-1">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              
              {/* Suggested questions */}
              <div className={`px-4 py-2 border-t flex flex-wrap gap-2 ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                {suggestedQuestions.map((question) => (
                  <Badge
                    key={question.id}
                    className={`cursor-pointer transition-colors duration-200 py-1 px-2 text-xs ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600'
                        : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                    }`}
                    variant="outline"
                    onClick={() => handleQuestionClick(question.text)}
                  >
                    {question.text}
                  </Badge>
                ))}
              </div>
              
              {/* Input area */}
              <CardFooter className={`p-2 border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex w-full items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={handleFileButtonClick}
                  >
                    <Paperclip size={18} />
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                    />
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    className={`flex-1 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage(input);
                      }
                    }}
                  />
                  <Button 
                    size="icon" 
                    onClick={() => handleSendMessage(input)}
                    disabled={!input.trim()}
                    className={isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  >
                    <Send size={18} />
                  </Button>
                </div>
                {resumeData && resumeFileName && (
                  <div className="w-full mt-2 text-xs opacity-70 flex items-center">
                    <Paperclip size={12} className="mr-1" />
                    <span className="truncate">{resumeFileName}</span>
                  </div>
                )}
                {isProcessing && (
                  <div className="w-full mt-2 text-xs opacity-70 flex items-center">
                    <span className="animate-pulse">Processing resume...</span>
                  </div>
                )}
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export default ResumeAIChatbot;
