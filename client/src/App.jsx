import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MainLayout from "./components/layout/mainLayout/MainLayout";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

const App = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protected routes */}
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
         <Route path="profile/:id" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
