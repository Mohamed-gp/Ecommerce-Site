import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IRootState } from "../../../redux/store";
import AdminDashboardHeader from "./AdminDashboardHeader";
import AdminCount from "./AdminCount";
import {
  FaBoxOpen,
  FaChartLine,
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import customAxios from "../../../utils/axios/customAxios";

const AdminDashBoardRight = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    totalCustomers: 0,
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be actual API calls
        // For now using mock data
        setSalesData([
          { name: "Jan", sales: 4000 },
          { name: "Feb", sales: 3000 },
          { name: "Mar", sales: 2000 },
          { name: "Apr", sales: 2780 },
          { name: "May", sales: 1890 },
          { name: "Jun", sales: 2390 },
        ]);

        setCategoryData([
          { name: "Electronics", value: 400 },
          { name: "Clothing", value: 300 },
          { name: "Books", value: 300 },
          { name: "Home", value: 200 },
        ]);

        setSummaryStats({
          totalRevenue: 45890,
          totalOrders: 156,
          averageOrderValue: 294,
          totalCustomers: 89,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <AdminDashboardHeader />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${summaryStats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FaDollarSign className="text-blue-500 text-xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <FaChartLine className="text-green-500 mr-2" />
              <span className="text-green-500">+12.5%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {summaryStats.totalOrders}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <FaShoppingCart className="text-green-500 text-xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <FaChartLine className="text-green-500 mr-2" />
              <span className="text-green-500">+8.2%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${summaryStats.averageOrderValue}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <FaBoxOpen className="text-purple-500 text-xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <FaChartLine className="text-red-500 mr-2" />
              <span className="text-red-500">-2.1%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">
                {summaryStats.totalCustomers}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <FaUsers className="text-orange-500 text-xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <FaChartLine className="text-green-500 mr-2" />
              <span className="text-green-500">+5.8%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Sales Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Sales Trend
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#00C2FF"
                  fill="#00C2FF"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Category Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {categoryData.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <AdminCount />
    </div>
  );
};

export default AdminDashBoardRight;
