import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function UserDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "User";

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

      <h1>User Dashboard</h1>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>My Profile</h3>
          <p>View & edit your details</p>
        </div>

        <div style={styles.card}>
          <h3>Orders</h3>
          <p>Track your purchases</p>
        </div>

        <div style={styles.card}>
          <h3>Wishlist</h3>
          <p>Saved items</p>
        </div>

        <div style={styles.card}>
          <h3>Support</h3>
          <p>Help center</p>
        </div>
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#eef2f7",
    minHeight: "100vh",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
};

export default UserDashboard;
