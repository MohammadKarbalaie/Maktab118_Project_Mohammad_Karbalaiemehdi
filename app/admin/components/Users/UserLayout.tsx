"use client"
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../Header";
import StatCard from "../StatCard";
import UsersTable from "./UsersTable";
import UserDemographicsChart from "./UserDemographicsChart";

const userStats = {
	totalUsers: 152845,
	newUsersToday: 243,
	activeUsers: 98520,
	churnRate: "2.4%",
};

const UsersPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='کاربران' />
			
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>

				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='مجموع کاربران'
						icon={UsersIcon}
						value={userStats.totalUsers.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard name='کاربران جدید امروز' icon={UserPlus} value={userStats.newUsersToday} color='#10B981' />
					<StatCard
						name='کاربران فعال'
						icon={UserCheck}
						value={userStats.activeUsers.toLocaleString()}
						color='#F59E0B'
					/>
					<StatCard name='نرخ ریزش' icon={UserX} value={userStats.churnRate} color='#EF4444' />
				</motion.div>

				<UsersTable />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
					<UserDemographicsChart />
				</div>
			</main>
		</div>
	);
};
export default UsersPage;