import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
    try {
      const res = await api.get("/auth-check");
      setIsAuthenticated(res.data.success);
    } catch (err) {
      console.log(err);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  const handleLogout = async () => {
    await api.get("/logout");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center w-full">
            <span className="text-xl font-semibold text-gray-800">
              TaskManager
            </span>
            {isAuthenticated && (
              <div className="hidden md:flex space-x-4 mx-auto">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/showtasks"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Tasks
                </Link>
                <Link
                  to="/create"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  New Task
                </Link>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            <details className="relative">
              <summary className="cursor-pointer text-gray-700 hover:text-blue-600 transition focus:outline-none">
                ☰
              </summary>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg p-2 flex flex-col space-y-2 z-50">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/showtasks"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Tasks
                    </Link>
                    <Link
                      to="/create"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      New Task
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </details>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
