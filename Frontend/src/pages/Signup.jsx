
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./CSS/Signup.css";

// const Signup = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer" });
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/signup", form);
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert(err.response.data.msg || "Signup failed");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-card">
//         <h2>Signup</h2>
//         <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
//         <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
//         <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
//         <select onChange={e => setForm({ ...form, role: e.target.value })}>
//           <option value="buyer">Buyer</option>
//           <option value="seller">Seller</option>
//         </select>
//         <button onClick={handleSubmit}>Signup</button>
//       </div>
//     </div>
//   );
// };

// export default Signup;














import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./CSS/Signup.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <motion.div
        className="signup-card"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Signup</h2>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
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
        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>

        </select>
        <button onClick={handleSubmit}>Signup</button>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;