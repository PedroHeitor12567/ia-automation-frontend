import { Activity, MessageSquare, FileText, Mail, Zap } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Análises realizadas", value: "—", icon: Zap, color: "text-violet-400" },
  { label: "Conversas ativas", value: "—", icon: MessageSquare, color: "text-blue-400" },
  { label: "Documentos processados", value: "—", icon: FileText, color: "text-green-400" },
  { label: "E-mails classificados", value: "—", icon: Mail, color: "text-yellow-400" },
];

const quickActions = [
  { href: "/chat", label: "Iniciar Chat IA", description: "Converse com Claude ou Gemini", icon: MessageSquare },
  { href: "/documents", label: "Processar Documento", description: "Upload e extração com IA", icon: FileText },
  { href: "/automations/email", label: "Classificar E-mail", description: "Triagem automatizada", icon: Mail },
];

export default function DashboardPage() {
  return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Visão geral da automação inteligente</p>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={color} size={18} />
                  <span className="text-gray-400 text-xs">{label}</span>
                </div>
                <p className="text-2xl font-bold text-white">{value}</p>
              </div>
          ))}
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Ações rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map(({ href, label, description, icon: Icon }) => (
                <Link
                    key={href}
                    href={href}
                    className="bg-gray-900 border border-gray-800 hover:border-violet-600/50 rounded-xl p-5 transition-all group"
                >
                  <Icon className="text-violet-400 mb-3 group-hover:scale-110 transition-transform" size={22} />
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-gray-500 text-xs mt-1">{description}</p>
                </Link>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-violet-400" size={18} />
            <h2 className="text-sm font-semibold text-white">Status do Sistema</h2>
          </div>
          <div className="space-y-3">
            {["Backend FastAPI", "PostgreSQL", "Redis", "Claude API", "Gemini API"].map((service) => (
                <div key={service} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{service}</span>
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
                não conectado
              </span>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}