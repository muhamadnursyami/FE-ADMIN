import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Sidebarr({ isOpen, toggleSidebar }) {
  return (
    <aside
      className={`fixed top-0 left-0 w-64 h-full pt-20 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              to="/"
              onClick={toggleSidebar}
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              to="artikel"
              onClick={toggleSidebar}
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Artikel</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

Sidebarr.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebarr;
