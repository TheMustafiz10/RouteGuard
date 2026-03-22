


import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./CSS/BuyerDashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const BuyerDashboard = () => {
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

  const cardData = [
    { title: "Total Purchases", value: "$1,250" },
    { title: "Orders Pending", value: "4" },
    { title: "Wishlist Items", value: "12" },
    { title: "Messages", value: "3" },
  ];

  const quickActions = ["Add to Wishlist", "Track Orders", "Write Review", "Check Discounts"];

  const ordersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: [2, 3, 5, 4, 6, 7],
        backgroundColor: "#74ebd5",
      },
    ],
  };

  const spendingData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Spending ($)",
        data: [200, 150, 300, 250, 400, 350],
        borderColor: "#acb6e5",
        backgroundColor: "rgba(172,182,229,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="buyer-dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Buyer Panel</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Orders</li>
          <li>Wishlist</li>
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
            <h3>Orders Over Months</h3>
            <Bar data={ordersData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>

          <div className="chart animated-card">
            <h3>Spending Over Months</h3>
            <Line data={spendingData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        </section>

        {/* Recent Purchases */}
        <section className="recent-purchases animated-card">
          <h3>Recent Purchases</h3>
          <ul>
            <li>Order #201 - Delivered</li>
            <li>Order #200 - Pending</li>
            <li>Order #199 - Cancelled</li>
            <li>Order #198 - Shipped</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default BuyerDashboard;