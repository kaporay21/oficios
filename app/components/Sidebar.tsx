"use client";

interface SidebarProps {
  activo: string;
}

const items = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Mi perfil", href: "/dashboard/perfil" },
  { label: "Trabajos", href: "/dashboard/trabajos" },
  { label: "Presupuestos", href: "/dashboard/presupuestos" },
  { label: "Clientes", href: "/dashboard/clientes" },
  { label: "Agenda", href: "/dashboard/agenda" },
  { label: "Chat", href: "/dashboard/chat" },
  { label: "Mi plan", href: "/dashboard/plan" },
];

export default function Sidebar({ activo }: SidebarProps) {
  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen p-6 hidden md:block">
      <a href="/" className="text-xl font-bold text-orange-500 block mb-8">OficiosYa</a>
      <nav className="space-y-1">
        {items.map((item) => (
          <a key={item.label} href={item.href} className={activo === item.label ? "block px-4 py-2 rounded-lg text-sm font-medium bg-orange-500 text-white" : "block px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"}>
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
