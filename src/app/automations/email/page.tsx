"use client";
import { useState } from "react";
import { classifyEmail, EmailClassificationResult } from "../../../services/api";
import { Mail, Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function EmailAutomationPage() {
    const [form, setForm] = useState({ sender: "", subject: "", body: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<EmailClassificationResult | null>(null);

    const handleSubmit = async () => {
        if (!form.sender || !form.subject || !form.body) {
            toast.error("Preencha todos os campos");
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const data = await classifyEmail({
                ...form,
                received_at: new Date().toISOString(),
            });
            setResult(data);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro na classificação");
        } finally {
            setIsLoading(false);
        }
    };

    const actionColors: Record<string, string> = {
        reply: "text-green-400 bg-green-400/10",
        forward: "text-blue-400 bg-blue-400/10",
        store: "text-yellow-400 bg-yellow-400/10",
        urgent: "text-red-400 bg-red-400/10",
    };

    return (
        <div className="p-6 space-y-6 max-w-2xl">
            <div>
                <h1 className="text-2xl font-bold text-white">Automação de E-mails</h1>
                <p className="text-gray-400 text-sm mt-1">Classificação e triagem automática com IA</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Mail className="text-violet-400" size={18} />
                    <span className="text-white font-semibold text-sm">Dados do E-mail</span>
                </div>

                <div>
                    <label className="text-gray-400 text-xs mb-1 block">Remetente</label>
                    <input
                        type="text"
                        value={form.sender}
                        onChange={(e) => setForm((f) => ({ ...f, sender: e.target.value }))}
                        placeholder="email@exemplo.com"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-violet-500"
                    />
                </div>

                <div>
                    <label className="text-gray-400 text-xs mb-1 block">Assunto</label>
                    <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                        placeholder="Assunto do e-mail"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-violet-500"
                    />
                </div>

                <div>
                    <label className="text-gray-400 text-xs mb-1 block">Corpo</label>
                    <textarea
                        value={form.body}
                        onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                        placeholder="Conteúdo do e-mail..."
                        rows={5}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-violet-500 resize-none"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                    {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                    {isLoading ? "Classificando..." : "Classificar E-mail"}
                </button>
            </div>

            {result && (
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
                    <h2 className="text-white font-semibold text-sm">Resultado da Classificação</h2>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-800 rounded-lg p-3">
                            <p className="text-gray-500 text-xs mb-1">Ação</p>
                            <span
                                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                    actionColors[result.action] || "text-gray-400 bg-gray-700"
                                }`}
                            >
                {result.action}
              </span>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3">
                            <p className="text-gray-500 text-xs mb-1">Categoria</p>
                            <p className="text-gray-200 text-sm font-medium">{result.category}</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3">
                            <p className="text-gray-500 text-xs mb-1">Confiança</p>
                            <p className="text-gray-200 text-sm font-medium">
                                {(result.confidence * 100).toFixed(0)}%
                            </p>
                        </div>
                    </div>

                    {result.suggested_response && (
                        <div>
                            <p className="text-gray-400 text-xs mb-2">Resposta sugerida</p>
                            <div className="bg-gray-800 rounded-lg p-3 text-gray-300 text-sm whitespace-pre-wrap">
                                {result.suggested_response}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}