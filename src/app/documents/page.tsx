import DocumentUploader from "../../components/dashboard/DocumentUploader";

export default function DocumentsPage() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Documentos</h1>
                <p className="text-gray-400 text-sm mt-1">Upload e processamento inteligente com IA</p>
            </div>
            <DocumentUploader />
        </div>
    );
}