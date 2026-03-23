import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal AI CRM",
  description: "Job Seekers CRM MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen flex flex-col pt-16">
        <header className="fixed top-0 left-0 right-0 h-16 border-b border-slate-700 bg-slate-900 z-50 flex items-center px-6">
          <div className="font-bold text-xl text-blue-400">Personal CRM</div>
        </header>
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
