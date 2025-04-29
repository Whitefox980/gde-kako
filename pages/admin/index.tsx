import dynamic from "next/dynamic";

const AdminPanel = dynamic(() => import("../../components/AdminPanel"), {
  ssr: false,
});

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <AdminPanel />
    </div>
  );
}
