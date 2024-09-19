export default function AdminHeader() {
    return (
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-700">Home</a></li>
              <li><a href="#" className="text-gray-700">About</a></li>
              <li><a href="#" className="text-gray-700">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  