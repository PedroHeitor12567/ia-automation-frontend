"use client";
import { useState, useRef, useEffect } from "react";
import { useChat } from "../../hooks/useChat";
import { useChatStore } from "../../hooks/useChatStore";
import { Send, Bot, User, Loader2 } from "lucide-react";

export default function ChatWindow() {
    const [input, setInput] = useState("");
    const { messages, isLoading, sendMessage, provider } = useChat();
    const { setProvider, reset } = useChatStore();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const text = input;
        setInput("");
        await sendMessage(text);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-950 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <Bot className="text-violet-400" size={20} />
                    <span className="text-white font-semibold text-sm">Chat Interno IA</span>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={provider}
                        onChange={(e) => setProvider(e.target.value as "claude" | "gemini")}
                        className="bg-gray-800 text-gray-300 text-xs rounded-md px-2 py-1 border border-gray-700 focus:outline-none"
                    >
                        <option value="claude">Claude</option>
                        <option value="gemini">Gemini</option>
                    </select>
                    <button
                        onClick={reset}
                        className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    >
                        Nova conversa
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                        <Bot className="text-violet-400" size={40} />
                        <p className="text-gray-400 text-sm">Faça uma pergunta com base nos dados internos</p>
                    </div>
                )}
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                        <div
                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                msg.role === "user" ? "bg-violet-600" : "bg-gray-700"
                            }`}
                        >
                            {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                        </div>
                        <div
                            className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                                msg.role === "user"
                                    ? "bg-violet-600 text-white rounded-tr-sm"
                                    : "bg-gray-800 text-gray-200 rounded-tl-sm"
                            }`}
                        >
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                            {msg.role === "assistant" && msg.tokens_used && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {msg.tokens_used} tokens · {msg.provider}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                            <Bot size={14} />
                        </div>
                        <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
                            <Loader2 className="text-violet-400 animate-spin" size={16} />
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <div className="px-4 pb-4">
                <div className="flex gap-2 bg-gray-800 rounded-xl border border-gray-700 p-2">
          <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
              rows={1}
              className="flex-1 bg-transparent text-gray-200 text-sm placeholder-gray-500 resize-none focus:outline-none"
          />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="flex-shrink-0 w-8 h-8 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors"
                    >
                        <Send size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}