import AdminGuard from "@/components/AdminGuard";


export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AdminGuard>
      {children}
      </AdminGuard>
    </div>
  );
}
