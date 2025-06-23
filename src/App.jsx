import "./App.css";
import SignIn from "./components/SignIn";
import AdminPanel from "./components/AdminPanel";
import ProtectRoute from "./components/ProtectRoute";
import UserContextState from "./statesManagement/UserContextState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <UserContextState>
      <div className="app overflow-hidden">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectRoute>
                  <AdminPanel />
                </ProtectRoute>
              }
            />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContextState>
  );
}
