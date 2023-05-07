import { LoginForm } from "./layouts/index";
import { RegistrationForm } from "./layouts/index";
import { Crud } from "./layouts/index";
import Dashboard from "./pages/admin/Dashboard";
import AdminPrivateRoute from "./AdminPrivateRoute.tsx";
import List from "./pages/admin/List";
import {
  AdminLayout,
  TeacherLayout,
  CfdLayout,
  StudentLayout,
} from "./pages/index";
import "./assets/style/app.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : " ";
  return config;
});

function App() {
  return (
    <div>
      <Routes>
        {/* <Route exact path="/" Component={List} /> */}
        <Route exact path="/" Component={LoginForm} />
        <Route exact path="/REGISTER" Component={RegistrationForm} />
        <Route path="/admin" element={<AdminPrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/List" element={<List />} />
            <Route  path="/admin/REGISTER" Component={RegistrationForm} />
          </Route>
        </Route>

        {/* <Route exact path="/admin" Component={AdminLayout} /> */}
        <Route exact path="/Cfd" Component={CfdLayout} />
        <Route exact path="/Student" Component={StudentLayout} />
        <Route exact path="/Teacher" Component={TeacherLayout} />
      </Routes>
    </div>
  );
}

export default App;
