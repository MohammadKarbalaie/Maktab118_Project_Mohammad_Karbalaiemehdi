import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { AiOutlineCloseCircle, AiOutlineHourglass, AiOutlineSend } from "react-icons/ai";

const orderData = [
	{ id: "ORD001", customer: "John Doe", total: 235.4, status: " ارسال شده", date: "2023-07-01" },
	{ id: "ORD002", customer: "Jane Smith", total: 412.0, status: "در حال پردازش", date: "2023-07-02" },
	{ id: "ORD003", customer: "Bob Johnson", total: 162.5, status: "لغو شده", date: "2023-07-03" },
	{ id: "ORD004", customer: "Alice Brown", total: 750.2, status: "در انتظار", date: "2023-07-04" },
	{ id: "ORD005", customer: "Charlie Wilson", total: 95.8, status: " ارسال شده", date: "2023-07-05" },
	{ id: "ORD006", customer: "Eva Martinez", total: 310.75, status: "در حال پردازش", date: "2023-07-06" },
	{ id: "ORD007", customer: "David Lee", total: 528.9, status: "لغو شده", date: "2023-07-07" },
	{ id: "ORD008", customer: "Grace Taylor", total: 189.6, status: " ارسال شده", date: "2023-07-08" },
];

const OrdersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredOrders, setFilteredOrders] = useState(orderData);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = orderData.filter(
			(order) => order.id.toLowerCase().includes(term) || order.customer.toLowerCase().includes(term)
		);
		setFilteredOrders(filtered);
	};

	return (
		<motion.div
			className='bg-gray-200 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-950'>لیست سفارشات</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='جستجوی سفارشات ...'
						className='bg-gray-300 text-gray-950 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-950 ' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-start text-xs font-medium text-gray-950  uppercase tracking-wider'>
								شماره شفارش
							</th>
							<th className='px-6 py-3 text-start  text-xs font-medium text-gray-950  uppercase tracking-wider'>
								مشتری
							</th>
							<th className='px-6 py-3 text-start text-xs font-medium text-gray-950 uppercase tracking-wider'>
								جمع مبلغ
							</th>
							<th className='px-6 py-3 text-start text-xs font-medium text-gray-950  uppercase tracking-wider'>
								وضعیت
							</th>
							<th className='px-6 py-3 text-start text-xs font-medium text-gray-950  uppercase tracking-wider'>
								تاریخ
							</th>
							<th className='px-6 py-3 text-start text-xs font-medium text-gray-950  uppercase tracking-wider'>
								اقدام
							</th>
						</tr>
					</thead>

					<tbody className='divide divide-gray-700'>
						{filteredOrders.map((order) => (
							<motion.tr
								key={order.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-950'>
									{order.id}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-950'>
									{order.customer}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-950'>
									${order.total.toFixed(2)}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											order.status === " ارسال شده"
												? "bg-green-100 text-green-800"
												: order.status === "در حال پردازش"
												? "bg-yellow-100 text-yellow-800"
												: order.status === "در انتظار"
												? "bg-blue-100 text-blue-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{order.status}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{order.date}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>
									<button className='text-green-600 hover:text-indigo-300 mr-2'>
										<AiOutlineSend size={18} />
									</button>
									<button className='text-yellow-700 hover:text-indigo-300 mr-2'>
										<AiOutlineHourglass size={18} />
									</button>
									<button className='text-red-400 hover:text-indigo-300 mr-2'>
										<AiOutlineCloseCircle size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default OrdersTable;