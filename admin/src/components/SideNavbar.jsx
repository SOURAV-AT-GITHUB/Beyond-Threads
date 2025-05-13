import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InventoryIcon from "@mui/icons-material/Inventory";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import FiberNewIcon from "@mui/icons-material/FiberNew";
export default function SideNavbar() {
  const { pathname } = useLocation();
  const [productsExpanded, setProductsExpanded] = useState(false);
  const toggleProducts = () => setProductsExpanded((prev) => !prev);
  const [sectionsExpanded, setSectionsExpanded] = useState(false);
  const toggleSections = () => setSectionsExpanded((prev) => !prev);
  return (
    <div className="sticky top-0 flex flex-col gap-1 border-r border-headings p-2">
      
      <NavLink to="/">
        <div
          className={`flex items-center gap-2 p-2 text-lg ${
            pathname === "/" && "text-primary border-b"
          }`}
        >
          <DashboardIcon />
          <p>Dashboard</p>
        </div>
      </NavLink>

      <div
        className={`p-2 overflow-hidden ${
          productsExpanded ? "h-[200px]" : "h-[50px]"
        } ${
          pathname.includes("/products/") && "text-primary"
        } cursor-pointer transition-[height] duration-300 ease-in-out`}
      >
        <div
          onClick={toggleProducts}
          className="flex justify-between items-center"
        >
          <div className="flex gap-2">
            <InventoryIcon />
            <p>Products</p>
          </div>
          <KeyboardArrowDownIcon
            className={`${productsExpanded ? "rotate-180" : ""}`}
          />
        </div>
        {/**expand */}
        <div className="flex flex-col gap-2 p-3">
          <NavLink to="/products/men">
            <div
              className={`flex items-center gap-1 py-2 ${
                pathname === "/products/men"
                  ? "text-primary border-b"
                  : "text-black"
              }`}
            >
              <ManIcon />
              <p>Menswear</p>
            </div>
          </NavLink>
          <NavLink to="/products/women">
            <div
              className={`flex items-center gap-1 py-2 ${
                pathname === "/products/women"
                  ? "text-primary border-b"
                  : "text-black"
              }`}
            >
              <WomanIcon />
              <p>Womanswear</p>
            </div>
          </NavLink>
          <NavLink to="/products/decor">
            <div
              className={`flex items-center gap-1 py-2 ${
                pathname === "/products/decor"
                  ? "text-primary border-b"
                  : "text-black"
              }`}
            >
              <AcUnitIcon />
              <p>Decor</p>
            </div>
          </NavLink>
        </div>
      </div>

      <NavLink to="/orders">
        <div
          className={`flex items-center gap-2 p-2 text-lg ${
            pathname === "/orders" ? "text-primary border-b" : "text-black"
          }`}
        >
          <ShoppingCartIcon />
          <p>Orders</p>
        </div>
      </NavLink>

      <div
        className={`p-2 overflow-hidden ${
          sectionsExpanded ? "h-[200px]" : "h-[50px]"
        } ${
          pathname.includes("/sections/") && "text-primary"
        } cursor-pointer transition-[height] duration-300 ease-in-out`}
      >
        <div
          onClick={toggleSections}
          className="flex justify-between items-center"
        >
          <div className="flex gap-2">
            <CategoryIcon />
            <p>Sections</p>
          </div>
          <KeyboardArrowDownIcon
            className={`${sectionsExpanded ? "rotate-180" : ""}`}
          />
        </div>
        {/**expand */}
        <div className="flex flex-col gap-2 p-3">
          <NavLink to="/sections/new-arrivals">
            <div
              className={`flex items-center gap-1 py-2 ${
                pathname === "/sections/new-arrivals"
                  ? "text-primary border-b"
                  : "text-black"
              }`}
            >
              <FiberNewIcon />
              <p>New Arrivals</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
