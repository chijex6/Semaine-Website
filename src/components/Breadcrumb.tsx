import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
export const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);
  return <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
      <Link to="/" className="hover:text-gray-900">
        Home
      </Link>
      {paths.map((path, index) => <React.Fragment key={path}>
          <ChevronRight className="h-4 w-4" />
          <Link to={`/${paths.slice(0, index + 1).join("/")}`} className="capitalize hover:text-gray-900">
            {path}
          </Link>
        </React.Fragment>)}
    </nav>;
};