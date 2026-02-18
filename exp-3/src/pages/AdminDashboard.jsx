import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Admin";

  const logout = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>

      {/* Header */}
      <div className="dashboard-header">
        <h2>Hello, {username}</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <h1>Admin Dashboard</h1>

      <div style={styles.grid}>
        <div style={styles.card}>Manage Users</div>
        <div style={styles.card}>Reports</div>
        <div style={styles.card}>System Settings</div>
        <div style={styles.card}>Analytics</div>
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    fontWeight: "bold",
  },
};

export default AdminDashboard;
