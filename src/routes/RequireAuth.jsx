// import { Navigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../services/authApi";
//
// export default function RequireAuth({ children }) {
//     const location = useLocation();
//     const [auth, setAuth] = useState(null);   // null = carregando
//
//     useEffect(() => {
//         api.get("/me")
//             .then(() => setAuth(true))            // access OK
//             .catch(() => setAuth(false));         // 401 → refresh → ainda 401
//     }, []);
//
//     if (auth === null) return null;           // opcional: spinner
//     //if (auth === false)
//      //  return <Navigate to="/login" state={{ from: location }} replace />;
//
//     return children;
// }