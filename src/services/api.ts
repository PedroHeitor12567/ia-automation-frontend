import axios from "axios";

const api = axios.create({
    baseURL: "https://ia-automation-7omi.onrender.com",
    headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.detail || "Erro inesperado";
        return Promise.reject(new Error(message));
    }
);

export type AIProvider = "claude" | "gemini";

export interface AnalyzeTextPayload {
    text: string;
    system_prompt?: string;
    provider?: AIProvider;
}

export interface AnalyzeTextResult {
    content: string;
    tokens_used: number;
    provider: string;
    model: string;
}

export interface ChatMessagePayload {
    message: string;
    conversation_id?: string;
    provider?: AIProvider;
}

export interface ChatMessageResult {
    conversation_id: string;
    assistant_message: string;
    tokens_used: number;
    provider: string;
}

export interface EmailPayload {
    sender: string;
    subject: string;
    body: string;
    received_at: string;
}

export interface EmailClassificationResult {
    action: string;
    category: string;
    suggested_response: string;
    confidence: number;
}

export interface Document {
    id: string;
    filename: string;
    status: string;
    created_at: string;
}

export interface DocumentDetail extends Document {
    summary: string;
    extracted_data: Record<string, unknown>;
    processed_at: string | null;
}

export const analyzeText = async (payload: AnalyzeTextPayload): Promise<AnalyzeTextResult> => {
    const { data } = await api.post("/api/v1/analyze", payload);
    return data;
};

export const sendChatMessage = async (payload: ChatMessagePayload): Promise<ChatMessageResult> => {
    const { data } = await api.post("/api/v1/chat", payload);
    return data;
};

export const getChatHistory = async (conversationId: string) => {
    const { data } = await api.get(`/api/v1/chat/${conversationId}/history`);
    return data;
};

export const uploadDocument = async (file: File): Promise<Document> => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post("/api/v1/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
};

export const getDocuments = async (): Promise<Document[]> => {
    const { data } = await api.get("/api/v1/documents");
    return data;
};

export const getDocumentDetail = async (id: string): Promise<DocumentDetail> => {
    const { data } = await api.get(`/api/v1/documents/${id}`);
    return data;
};

export const classifyEmail = async (payload: EmailPayload): Promise<EmailClassificationResult> => {
    const { data } = await api.post("/api/v1/automations/email/classify", payload);
    return data;
};