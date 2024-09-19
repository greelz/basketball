
export default function AdminSidebar() {
    return (
        <aside className="bg-gray-800 min-h-screen w-64 p-4">
            <ul className="text-white">
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-600">Dashboard</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-600">Profile</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-600">Settings</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-600">Logout</a></li>
            </ul>
        </aside>
    );
}
