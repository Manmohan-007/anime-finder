import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "Pages/Home/Home";
import Detail from "Pages/DetailView/Detail";
import DashboardLayout from "Shared/Dashboard/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Detail />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
