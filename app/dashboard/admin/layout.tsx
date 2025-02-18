import AdminGuard from "@/components/AdminGuard";
import { AuthProvider } from "@/context/AuthContext";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthProvider>
        <AdminGuard>{children}</AdminGuard>
      </AuthProvider>
    </div>
  );
}
