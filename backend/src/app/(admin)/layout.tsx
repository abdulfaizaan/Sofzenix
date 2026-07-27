import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <aside className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">SOFZENIX Admin</h1>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
            Dashboard
          </Link>
          <Link href="/admin/leads" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
            Leads
          </Link>
          <Link href="/admin/applications" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
            Applications
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
