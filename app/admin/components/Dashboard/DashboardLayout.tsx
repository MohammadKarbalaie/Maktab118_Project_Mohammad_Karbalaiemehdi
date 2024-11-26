import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../Header";
import StatCard from "../StatCard";
import SalesOverviewChart from "./SalesOverviewChart";
import CategoryDistributionChart from "./CategoryDistributionChart";
import SalesChannelChart from "./SalesChannelChart";

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="داشبورد" />

      <main className="max-w-8xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="کل فروش" icon={Zap} value="$12,345" color="#6366F1" />
          <StatCard name="کاربران جدید" icon={Users} value="1,234" color="#8B5CF6" />
          <StatCard name="مجموع محصولات" icon={ShoppingBag} value="567" color="#EC4899" />
          <StatCard name="نرخ تبدیل" icon={BarChart2} value="12.5%" color="#10B981" />
        </motion.div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
