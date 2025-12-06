import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  Tag,
  HelpCircle,
  Mail,
  LogOut,
} from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session");

  if (!adminSession) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            KasirQ Admin
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/testimonials"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <MessageSquare size={20} />
            <span>Testimonials</span>
          </Link>
          <Link
            href="/admin/pricing"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <Tag size={20} />
            <span>Pricing Plans</span>
          </Link>
          <Link
            href="/admin/faqs"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <HelpCircle size={20} />
            <span>FAQs</span>
          </Link>
          <Link
            href="/admin/contact"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <Mail size={20} />
            <span>Inquiries</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <form
            action={async () => {
              "use server";
              const cookieStore = await cookies();
              cookieStore.delete("admin_session");
              redirect("/admin/login");
            }}
          >
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-900 p-8">{children}</main>
    </div>
  );
}
