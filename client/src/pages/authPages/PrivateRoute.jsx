import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth-check");
        if (res.data.success) {
          setAuth(true);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return auth ? children : null;
};

export default PrivateRoute;
