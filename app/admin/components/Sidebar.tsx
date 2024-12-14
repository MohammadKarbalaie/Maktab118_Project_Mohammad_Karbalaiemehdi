import { BarChart2, Group, Menu, ShoppingBag, ShoppingCart, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import LogoutButton from "../../adminserver/services/LogoutButton";

const SIDEBAR_ITEMS = [
  {
    name: "پنل ادمین",
    icon: BarChart2,
    color: "#6366f1",
    href: "/admin/dashboard",
  },
  { name: "محصولات", icon: ShoppingBag, color: "#8B5CF6", href: "/admin/dashboard/products" },
  { name: "کاربران", icon: Users, color: "#EC4899", href: "/admin/dashboard/users" },
  { name: "دسته بندی ها", icon: Group, color: "#10B981", href: "/admin/dashboard/categories" },
  { name: "سفارشات", icon: ShoppingCart, color: "#F59E0B", href: "/admin/dashboard/orders" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProductsOpen, setIsProductsOpen] = useState(false); // وضعیت برای نمایش زیرگروه محصولات

  return (
    <motion.div
      className={`relative z-10 transition-all h-full duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-[306px]" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 306 : 80 }}
    >
      <div className="h-full bg-gray-900 text-white backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <div key={item.href}>
              {item.name === "محصولات" ? (
                <motion.div
                  className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer"
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                >
                  <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="mr-2 whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <Link href={item.href}>
                  <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                    <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                    <AnimatePresence>
                      {isSidebarOpen && (
                        <motion.span
                          className="mr-2 whitespace-nowrap"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2, delay: 0.3 }}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              )}

              {item.name === "محصولات" && isProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-8"
                >
                  <Link href="/admin/dashboard/products">
                    <motion.div className="text-sm font-medium px-2 py-4  rounded-lg hover:bg-gray-700">
                        لیست محصولات
                    </motion.div>
                  </Link>
                 <Link href="/admin/dashboard/products/producttoggle">
                    <motion.div className="text-sm font-medium px-2 py-4 border-t  hover:bg-gray-700">
                       لیست موجودی و قیمت 
                    </motion.div>
                  </Link>
                </motion.div>
              )}
            </div>
          ))}
           <LogoutButton />
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
