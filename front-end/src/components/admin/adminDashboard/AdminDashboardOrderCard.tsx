import { FaChartLine } from "react-icons/fa";

interface AdminDashboardOrderCardProps {
  title: string;
  count: number;
  status: {
    pending: number;
    processing: number;
    delivered: number;
  };
}

const AdminDashboardOrderCard = ({
  title,
  count,
  status,
}: AdminDashboardOrderCardProps) => {
  const calculateGrowth = () => {
    // This would need historical data to calculate properly
    // For now, return a placeholder growth value
    return Math.random() * 10 - 5; // Random growth between -5% and 5%
  };

  const orderGrowth = calculateGrowth();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-duration-300">
      <h3 className="text-lg font-semibold mb-4">{title} Orders</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Orders</span>
          <span className="font-semibold">{count}</span>
        </div>

        <div className="flex items-center text-sm">
          <FaChartLine
            className={
              orderGrowth >= 0 ? "text-green-500 mr-2" : "text-red-500 mr-2"
            }
          />
          <span
            className={orderGrowth >= 0 ? "text-green-500" : "text-red-500"}
          >
            {Math.abs(orderGrowth).toFixed(1)}%
          </span>
          <span className="text-gray-500 ml-2">from last period</span>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-yellow-500 font-semibold">
                {status.pending}
              </div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-blue-500 font-semibold">
                {status.processing}
              </div>
              <div className="text-xs text-gray-500">Processing</div>
            </div>
            <div className="text-center">
              <div className="text-green-500 font-semibold">
                {status.delivered}
              </div>
              <div className="text-xs text-gray-500">Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrderCard;
