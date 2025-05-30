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
import toast from "react-hot-toast";

const COLORS = [
  "#00C2FF",
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
];

const AdminDashBoardRight = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    averageOrderValue: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
    customersGrowth: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.get("/admin/analytics");
      const analytics = data.data;

      setSummaryStats(analytics.summaryStats);
      setSalesData(analytics.salesData);
      setCategoryData(analytics.categoryData);
    } catch (error) {
      toast.error("Failed to fetch dashboard analytics");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 p-6 bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainColor"></div>
        </div>
      </div>
    );
  }

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
              <span className="text-green-500">
                {summaryStats.revenueGrowth.toFixed(1)}%
              </span>
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
              <span className="text-green-500">
                {summaryStats.ordersGrowth.toFixed(1)}%
              </span>
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
              <span className="text-green-500">
                {summaryStats.customersGrowth.toFixed(1)}%
              </span>
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
                <XAxis dataKey="month" />
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
    </div>
  );
};

export default AdminDashBoardRight;
