// components/Layout.js
import AdminSidebar from './AdminSidebar';
import AdminContent from './AdminContent';
import AdminFooter from './AdminFooter';

export default function Layout() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminContent />
        <AdminFooter />
      </div>
    </div>
  );
}
