import { useCallback } from "react";
import { useChatStore } from "./useChatStore";
import { sendChatMessage } from "../services/api";
import toast from "react-hot-toast";

export const useChat = () => {
    const { conversationId, messages, isLoading, provider, setConversationId, addMessage, setLoading } =
        useChatStore();

    const sendMessage = useCallback(
        async (text: string) => {
            if (!text.trim() || isLoading) return;

            const userMessage = {
                id: crypto.randomUUID(),
                role: "user" as const,
                content: text,
                created_at: new Date().toISOString(),
            };

            addMessage(userMessage);
            setLoading(true);

            try {
                const result = await sendChatMessage({
                    message: text,
                    conversation_id: conversationId || undefined,
                    provider,
                });

                if (!conversationId) {
                    setConversationId(result.conversation_id);
                }

                addMessage({
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: result.assistant_message,
                    provider: result.provider,
                    tokens_used: result.tokens_used,
                    created_at: new Date().toISOString(),
                });
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Erro ao enviar mensagem");
            } finally {
                setLoading(false);
            }
        },
        [conversationId, isLoading, provider, addMessage, setConversationId, setLoading]
    );

    return { messages, isLoading, sendMessage, provider };
};