"use client"
import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../Header";
import StatCard from "../StatCard";
import OrdersTable from "../Orders/OrdersTable";

const orderStats = {
	totalOrders: "1,234",
	pendingOrders: "56",
	completedOrders: "1,178",
	totalRevenue: "$98,765",
};

const OrdersPage = () => {
	return (
		<div className='flex-1 relative z-10 overflow-auto'>
			<Header title={"سفارشات"} />

			<main className='max-w-7xl mx-auto py-6 h-[110vh] px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='کل سفارشات' icon={ShoppingBag} value={orderStats.totalOrders} color='#6366F1' />
					<StatCard name='سفارشات در انتظار' icon={Clock} value={orderStats.pendingOrders} color='#F59E0B' />
					<StatCard
						name='سفارشات تکمیل شده '
						icon={CheckCircle}
						value={orderStats.completedOrders}
						color='#10B981'
					/>
					<StatCard name='کل درآمد' icon={DollarSign} value={orderStats.totalRevenue} color='#EF4444' />
				</motion.div>
				<OrdersTable />
				<div className='grid mt-6 grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
		
				</div>

				
			</main>
		</div>
	);
};
export default OrdersPage;