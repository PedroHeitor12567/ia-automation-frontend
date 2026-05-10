import { create } from "zustand";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    provider?: string;
    tokens_used?: number;
    created_at: string;
}

interface ChatStore {
    conversationId: string | null;
    messages: Message[];
    isLoading: boolean;
    provider: "claude" | "gemini";
    setConversationId: (id: string) => void;
    addMessage: (message: Message) => void;
    setLoading: (loading: boolean) => void;
    setProvider: (provider: "claude" | "gemini") => void;
    reset: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    conversationId: null,
    messages: [],
    isLoading: false,
    provider: "claude",
    setConversationId: (id) => set({ conversationId: id }),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    setLoading: (loading) => set({ isLoading: loading }),
    setProvider: (provider) => set({ provider }),
    reset: () => set({ conversationId: null, messages: [], isLoading: false }),
}));