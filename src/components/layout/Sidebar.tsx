"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, FileText, Mail, Activity, Zap } from "lucide-react";
import { clsx } from "clsx";

const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/chat", label: "Chat IA", icon: MessageSquare },
    { href: "/documents", label: "Documentos", icon: FileText },
    { href: "/automations/email", label: "E-mails", icon: Mail },
    { href: "/monitoring", label: "Monitoramento", icon: Activity },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-56 flex-shrink-0 bg-gray-950 border-r border-gray-800 flex flex-col">
            <div className="px-5 py-5 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <Zap className="text-violet-400" size={20} />
                    <span className="text-white font-bold text-sm tracking-wide">AI Automation</span>
                </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map(({ href, label, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className={clsx(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                            pathname === href
                                ? "bg-violet-600/20 text-violet-300 font-medium"
                                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                        )}
                    >
                        <Icon size={16} />
                        {label}
                    </Link>
                ))}
            </nav>

            <div className="px-4 py-4 border-t border-gray-800">
                <div className="text-xs text-gray-600">v0.1.0</div>
            </div>
        </aside>
    );
}