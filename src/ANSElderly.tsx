import { Route } from "react-router";
import { Navigate } from "react-router";
import { Routes } from "react-router";
import { HashRouter } from "react-router";
import Welcome from "./pages/Welcome";
import { Login } from "./pages/Login";

function ANSElderly() {
  return (
    <div className="bg-[url(/images/background.jpg)] bg-cover bg-center h-screen w-screen flex">
      {/* overlay */}
      <div className="absolute inset-0 bg-blue-900/50 z-0" />
      {/* content */}
      <div className="flex text-white w-full h-full text-shadow-lg z-1 font-normal">
        <HashRouter>
          <Routes>
            <Route index element={<Navigate to="welcome" replace />} />
            <Route path="welcome" element={<Welcome/>}/>
            <Route path="login" element={<Login/>}/>
          </Routes>
        </HashRouter>
      </div>
    </div>
  )
}

export default ANSElderly;
