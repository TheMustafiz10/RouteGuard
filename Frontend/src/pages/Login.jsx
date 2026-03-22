

// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext.jsx";
// import axios from "axios";
// import "./CSS/Login.css";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       login(res.data);

//       // Role-based redirect
//       if (res.data.user.role === "seller") navigate("/seller");
//       else navigate("/buyer");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.msg || "Login failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={e => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={e => setForm({ ...form, password: e.target.value })}
//         />
//         <button onClick={handleSubmit}>Login</button>
//       </div>
//     </div>
//   );
// };

// export default Login;









import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./CSS/Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      login(res.data);

      if (res.data.user.role === "seller") navigate("/seller");
      else navigate("/buyer");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleSubmit}>Login</button>
        <p className="signup-link">
          Don’t have an account? <Link to="/">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;