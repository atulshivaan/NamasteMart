import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Home = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userRes = await axiosInstance.get("/api/v1/get-users");
        const productRes = await axiosInstance.get("/api/v1/products");
        const salesRes = await axiosInstance.get("/api/v1/sales"); 

        setUsers(userRes.data.users || []);
        setProducts(productRes.data.products || []);
        setSalesData(salesRes.data.sales || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStats();
  }, []);

  // For pie chart: group users by role
  const roleDistribution = [
    { name: "Admin", value: users.filter(u => u.role === "admin").length },
    { name: "User", value: users.filter(u => u.role === "user").length },
  ];

  
  const fallbackSalesData = [
    { name: "Jan", sales: 2400 },
    { name: "Feb", sales: 1398 },
    { name: "Mar", sales: 9800 },
    { name: "Apr", sales: 3908 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
   

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">{users.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
          <p className="text-3xl font-bold text-green-600">{products.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-700">Sales This Year</h2>
          <p className="text-3xl font-bold text-purple-600">
            ₹{salesData.reduce((acc, cur) => acc + (cur.amount || 0), 0)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Role Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">User Roles</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={roleDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                dataKey="value"
              >
                {roleDistribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData.length > 0 ? salesData : fallbackSalesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
