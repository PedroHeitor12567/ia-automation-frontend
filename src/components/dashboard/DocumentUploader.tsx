"use client";
import { useState, useCallback } from "react";
import { uploadDocument, Document } from "../../services/api";
import { Upload, FileText, CheckCircle, XCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function DocumentUploader() {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedDoc, setUploadedDoc] = useState<Document | null>(null);

    const handleFile = useCallback(async (file: File) => {
        if (!file.name.endsWith(".txt") && !file.name.endsWith(".pdf")) {
            toast.error("Apenas arquivos .txt e .pdf são suportados");
            return;
        }

        setIsUploading(true);
        setUploadedDoc(null);

        try {
            const result = await uploadDocument(file);
            setUploadedDoc(result);
            toast.success("Documento processado com sucesso");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro no upload");
        } finally {
            setIsUploading(false);
        }
    }, []);

    const onDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div className="space-y-4">
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                    isDragging
                        ? "border-violet-500 bg-violet-500/10"
                        : "border-gray-700 hover:border-gray-600 bg-gray-900"
                }`}
            >
                <input
                    type="file"
                    accept=".txt,.pdf"
                    onChange={onInputChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {isUploading ? (
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="text-violet-400 animate-spin" size={32} />
                        <p className="text-gray-400 text-sm">Processando documento com IA...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <Upload className="text-gray-500" size={32} />
                        <p className="text-gray-400 text-sm">
                            Arraste um arquivo ou <span className="text-violet-400">clique para selecionar</span>
                        </p>
                        <p className="text-gray-600 text-xs">.txt, .pdf</p>
                    </div>
                )}
            </div>

            {uploadedDoc && (
                <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex items-center gap-3">
                    <FileText className="text-violet-400 flex-shrink-0" size={20} />
                    <div className="flex-1 min-w-0">
                        <p className="text-gray-200 text-sm font-medium truncate">{uploadedDoc.filename}</p>
                        <p className="text-gray-500 text-xs">
                            {new Date(uploadedDoc.created_at).toLocaleString("pt-BR")}
                        </p>
                    </div>
                    {uploadedDoc.status === "completed" ? (
                        <CheckCircle className="text-green-400 flex-shrink-0" size={18} />
                    ) : uploadedDoc.status === "failed" ? (
                        <XCircle className="text-red-400 flex-shrink-0" size={18} />
                    ) : (
                        <Loader2 className="text-yellow-400 animate-spin flex-shrink-0" size={18} />
                    )}
                </div>
            )}
        </div>
    );
}