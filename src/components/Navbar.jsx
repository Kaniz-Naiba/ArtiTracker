import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react"; // Lucide icons

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const publicLinks = (
    <>
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-red-600 dark:text-white ${
              isActive ? "text-red-600 font-semibold" : ""
            }`
          }
        >
          Home
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/all-artifacts"
          className={({ isActive }) =>
            `hover:text-red-600 dark:text-white ${
              isActive ? "text-red-600 font-semibold" : ""
            }`
          }
        >
          All Artifacts
        </NavLink>
      </div>
      {!user && (
        <>
          <div>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `hover:text-red-600 dark:text-white ${
                  isActive ? "text-red-600 font-semibold" : ""
                }`
              }
            >
              Login
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `hover:text-red-600 dark:text-white ${
                  isActive ? "text-red-600 font-semibold" : ""
                }`
              }
            >
              Signup
            </NavLink>
          </div>
        </>
      )}
    </>
  );

  const protectedLinks = (
    <>
      <div>
        <NavLink
          to="/add-artifact"
          className={({ isActive }) =>
            `hover:text-red-600 dark:text-white ${
              isActive ? "text-red-600 font-semibold" : ""
            }`
          }
        >
          Add Artifact
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/liked-artifacts"
          className={({ isActive }) =>
            `hover:text-red-600 dark:text-white ${
              isActive ? "text-red-600 font-semibold" : ""
            }`
          }
        >
          Liked Artifacts
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/my-artifacts"
          className={({ isActive }) =>
            `hover:text-red-600 dark:text-white ${
              isActive ? "text-red-600 font-semibold" : ""
            }`
          }
        >
          My Posted Artifacts
        </NavLink>
      </div>
    </>
  );

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-extrabold text-yellow-600 hover:scale-105 transition-transform duration-300"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-8 h-8"
            >
              <path d="M3 3v2h2v14H3v2h18v-2h-2V5h2V3H3zm4 2h10v14H7V5z" />
            </svg>
          </span>
          <span className="font-serif tracking-wide">ArtiTrAcker</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="space-x-6 font-medium hidden md:flex text-gray-700 dark:text-white">
          {publicLinks}
          {user && protectedLinks}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-pink-600 text-xl"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Theme & Auth Buttons (Desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:underline dark:text-green-400"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-green-500"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50 text-sm text-gray-700 dark:text-white">
                  <div className="px-4 py-2 border-b dark:border-gray-600 font-semibold">
                    {user.displayName}
                  </div>
                  <Link
                    to="/my-artifacts"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Artifacts
                  </Link>
                  <Link
                    to="/liked-artifacts"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Liked Artifacts
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 pb-4 space-y-3 text-gray-700 dark:text-white">
          {publicLinks}
          {user && protectedLinks}

          <div className="flex flex-col space-y-2 mt-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
            {!user ? (
              <>
                <Link to="/login" className="text-green-600 hover:underline dark:text-green-400">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
