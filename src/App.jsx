import { LoginForm } from "./layouts/index";
import { RegistrationForm } from "./layouts/index";

import Dashboard from "./pages/admin/Dashboard";
import AdminPrivateRoute from "./AdminPrivateRoute.tsx";
import ViceDPrivateRoute from "./ViceDPrivateRoute";
import StudentPrivateRoute from "./StudentPrivateRoute";

import List from "./pages/admin/List";

import {
  AdminLayout,
  TeacherLayout,
  CfdLayout,
  StudentLayout,
  ViceD,
} from "./pages/index";
import "./assets/style/app.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import axios from "axios";
import PostContainer from "./components/POST/PostContainer";
import SharingPost from "./components/POST/SharingPost";

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
        {/* <Route exact path="/" Component={PostContainer} /> */}
        <Route exact path="/" Component={LoginForm} />
        {/* <Route exact path="/REGISTER" Component={RegistrationForm} /> */}
        <Route path="/admin" element={<AdminPrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/List" element={<List />} />
            <Route path="/admin/REGISTER" Component={RegistrationForm} />
          </Route>
        </Route>

        <Route exact path="/Cfd" Component={CfdLayout} />
        <Route exact path="/Teacher" Component={TeacherLayout} />
        <Route path="/Student" element={<StudentPrivateRoute />}>
          <Route path="/Student" Component={StudentLayout} />
        </Route>

        <Route path="/ViceD" element={<ViceDPrivateRoute />}>
          <Route path="/ViceD" element={<ViceD />}>
            <Route path="/ViceD/SharingPost" element={<SharingPost />} />

            <Route path="/ViceD/posts" element={<PostContainer />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
