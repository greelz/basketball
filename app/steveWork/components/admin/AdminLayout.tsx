// components/Layout.js
import AdminSidebar from './AdminSidebar';
import AdminContent from './AdminContent';
import AdminFooter from './AdminFooter';
import TESTELEMENT from '../TESTELEMENT';

export default function Layout() {
  return (<>
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-row ">
        <AdminContent />
      </div>
    </div>
    <AdminFooter />
  </>
  );
}
