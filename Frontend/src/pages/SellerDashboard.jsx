

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./CSS/SellerDashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const SellerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimate(true);
  }, []);

  // Seed data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales ($)",
        data: [5000, 7000, 6000, 8000, 9000, 12000],
        backgroundColor: "#74ebd5",
      },
    ],
  };

  const productDistribution = {
    labels: ["Electronics", "Clothes", "Toys", "Books"],
    datasets: [
      {
        label: "Products",
        data: [8, 12, 4, 5],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#acb6e5"],
        hoverOffset: 4,
      },
    ],
  };

  const cardData = [
    { title: "Total Sales", value: "$12,450" },
    { title: "Pending Orders", value: "8" },
    { title: "Products Listed", value: "24" },
    { title: "Messages", value: "5" },
  ];

  const quickActions = [
    "Add Product",
    "View Orders",
    "Manage Discounts",
    "Send Notification",
  ];

  return (
    <div className="seller-dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Seller Panel</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Orders</li>
          <li>Products</li>
          <li>Analytics</li>
          <li>Messages</li>
        </ul>
      </aside>


      <main className={`main-content ${animate ? "fade-in" : ""}`}>
        <nav className="top-navbar">
          <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            &#9776;
          </div>
          <div className="welcome">Hello, {user?.name}</div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>

        {/* Cards */}
        <section className="cards">
          {cardData.map((card, idx) => (
            <div className="card animated-card" key={idx}>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions">
            {quickActions.map((action, idx) => (
              <button key={idx} className="action-btn">{action}</button>
            ))}
          </div>
        </section>

        {/* Charts */}
        <section className="charts">
          <div className="chart animated-card">
            <h3>Sales Over Months</h3>
            <Bar data={salesData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>

          <div className="chart animated-card">
            <h3>Product Distribution</h3>
            <Doughnut data={productDistribution} options={{ responsive: true }} />
          </div>
        </section>

        {/* Recent Orders */}
        <section className="recent-orders animated-card">
          <h3>Recent Orders</h3>
          <ul>
            <li>Order #1024 - Pending</li>
            <li>Order #1023 - Completed</li>
            <li>Order #1022 - Shipped</li>
            <li>Order #1021 - Cancelled</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default SellerDashboard;