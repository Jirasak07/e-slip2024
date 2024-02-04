import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layouts } from "./Layout/Layouts";
import Home from "./Components/Publicc/Home";
import Budget from "./Components/Salary/Budget";
import Officer from "./Components/ManageUser/Officer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Home />} />
        <Route path="/" element={<Layouts />}>
          <Route path="/main-page" element={<Home />} />
          {/* /////////////////////////////////////////////////// */}
          <Route path="/manage-salary/salary" element={<Home />} />
          <Route path="/manage-salary/budget" element={<Budget />} />
          <Route path="/manage-salary/revenue" element={<Home />} />
          <Route path="/manage-salary/expenses" element={<Home />} />
          <Route path="/manage-salary/add-revenue-fromtype" element={<Home />} />
          <Route path="/manage-salary/add-expenses-fromtype" element={<Home />} />
          <Route path="/manage-salary/import-export" element={<Home />} />
          <Route path="/manage-salary/update-revenue" element={<Home />} />
          <Route path="/manage-salary/update-expenses" element={<Home />} />
          <Route path="/manage-salary/update-salary" element={<Home />} />
          {/* /////////////////////////////////////////////////////////////////// */}
          <Route path="/manage-user/user" element={<Officer />} />
          <Route path="/manage-user/ktb" element={<Home />} />
          {/* ////////////////////////////////////////////////////////////////// */}
          <Route path="/report/revenue-type" element={<Home />} />
          <Route path="/report/ipay" element={<Home />} />
          <Route path="/report/salary" element={<Home />} />
          <Route path="/report/print-history" element={<Home />} />
          <Route path="/report/notifications" element={<Home />} />
          <Route path="/report/tax" element={<Home />} />
          <Route path="/report/pdf" element={<Home />} />
          {/* /////////////////////////////////////////////////////////////////////////////// */}
          <Route path="/user-salary" element={<Home />} />
          <Route path="/form-receive-money" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
