import { motion } from "framer-motion";

import Header from "../Header";
import StatCard from "../StatCard";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import CategoryTbl from "./CategoryTbl";

const salesStats = {
	totalRevenue: "$1,234,567",
	averageOrderValue: "$78.90",
	conversionRate: "3.45%",
	salesGrowth: "12.3%",
};

const CategoryPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='دسته بندی ها' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8  h-screen'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='کل سرگروه ها' icon={DollarSign} value={salesStats.totalRevenue} color='#6366F1' />
					<StatCard
						name='کل زیر گروه ها'
						icon={ShoppingCart}
						value={salesStats.averageOrderValue}
						color='#10B981'
					/>
					<StatCard
						name='درصد محصولات به سرگروه'
						icon={TrendingUp}
						value={salesStats.conversionRate}
						color='#F59E0B'
					/>
					<StatCard name='درصد محصولات به زیرگروه' icon={CreditCard} value={salesStats.salesGrowth} color='#EF4444' />
				</motion.div>
				<CategoryTbl/>
				

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					
				
				</div>
			</main>
		</div>
	);
};
export default CategoryPage;