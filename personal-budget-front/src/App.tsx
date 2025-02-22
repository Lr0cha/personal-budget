import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Report from "./pages/Report";
import UpdatePassword from "./pages/UpdatePassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isPrivate={true}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PrivateRoute isPrivate={false}>
              <Login />
            </PrivateRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PrivateRoute isPrivate={false}>
              <Register />
            </PrivateRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <PrivateRoute isPrivate={false}>
              <Report />
            </PrivateRoute>
          }
        />

        <Route
          path="/update"
          element={
            <PrivateRoute isPrivate={true}>
              <UpdatePassword />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
