import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layouts } from "./Layout/Layouts";
import Home from "./Components/Publicc-user/Home";
import Budget from "./Components/menu-salary/Budget/Budget";
import Login from "./Components/Publicc-user/Login";
import Salary from "./Components/menu-salary/Salary/Salary";
import Revenue from "./Components/menu-salary/Revenue/Revenue";
import Officer from "./Components/ManageUser/Officer/Officer";
import KtbCorporate from "./Components/ManageUser/KtbCoperate/KtbCorporate";
import Expenditure from "./Components/menu-salary/Expenditure/Expenditure";
import AddExpenditure from "./Components/menu-salary/Expenditure/AddExpenditure/AddExpenditure";
import AddRevenue from "./Components/menu-salary/Revenue/AddRevenue/AddRevenue";
import Updatesalary from "./Components/menu-salary/Update/Updatesalary";
import Updaterevenueexpenditure from "./Components/menu-salary/Update/Updaterevenueexpenditure";
import Reportexpenditure from "./Components/menu-salary/Expenditure/Reportexpenditure";
import Reportrevenue from "./Components/menu-salary/Expenditure/Reportrevenue";
import Reportipay from "./Components/menu-salary/Expenditure/Reportipay";
import Uploadsalary from "./Components/menu-salary/Salary/Uploadsalary";
import FormKTB from "./Components/ManageUser/KtbCoperate/FormKTB";

import User from "./Components/Publicc-user/User";
import Reporthistoryprint from "./Components/menu-salary/Expenditure/Reporthistoryprint";
import Reportshowsalaryopen from "./Components/menu-salary/Expenditure/Reportshowsalaryopen";
import KTBForm from "./Components/Publicc-user/KTBForm";
import HowToPDF from "./Components/Publicc-user/HowToPDF";
import UploadSlip from "./Components/menu-salary/Upload/UploadSlip";
import Upload50 from "./Components/menu-salary/Upload/Upload50";
import UploadTax from "./Components/menu-salary/Upload/UploadTax";
import UploadTavi50ForAllCustomer from "./Components/menu-salary/Upload/UploadTavi50ForAllCustomer";
import Uploadsalary1715 from "./Components/menu-salary/Salary/Uploadsalary1715";


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layouts />}>
          <Route path="/main-page" element={<Home />} />
          {/* /////////////////////////////////////////////////// */}
          <Route path="/manage-salary/uploadslip" element={<UploadSlip />} />
          <Route path="/manage-salary/upload-tax" element={<UploadTax />} />
          <Route
            path="/manage-salary/customer-50"
            element={<UploadTavi50ForAllCustomer />}
          />
          <Route path="/manage-salary/upload50" element={<Upload50 />} />
          <Route path="/manage-salary/salary" element={<Salary />} />
          <Route path="/manage-funda/budget" element={<Budget />} />
          <Route path="/manage-funda/revenue" element={<Revenue />} />
          <Route path="/manage-funda/expenses" element={<Expenditure />} />
          <Route
            path="/manage-salary/add-revenue-fromtype"
            element={<AddRevenue />}
          />
          <Route
            path="/manage-salary/add-expenses-fromtype"
            element={<AddExpenditure />}
          />
          <Route
            path="/manage-salary/import-export"
            element={<Uploadsalary />}
          />
          <Route path="/manage-salary/update-revenue" element={<Home />} />
          <Route
            path="/manage-salary/update-expenses"
            element={<Updaterevenueexpenditure />}
          />
          <Route
            path="/manage-salary/update-salary"
            element={<Updatesalary />}
          />

          {/* /////////////////////////////////////////////////////////////////// */}
          <Route path="/manage-user/user" element={<Officer />} />
          <Route path="/manage-user/ktb" element={<KtbCorporate />} />
          {/* ////////////////////////////////////////////////////////////////// */}
          <Route path="/report/revenue-type" element={<Reportrevenue />} />
          <Route
            path="/report/expenditure-type"
            element={<Reportexpenditure />}
          />
          <Route
            path="/report"
            element={<Reportexpenditure />}
          />
          <Route path="/report/ipay" element={<Reportipay />} />
          <Route path="/report/salary" element={<Reportshowsalaryopen />} />
          <Route
            path="/report/print-history"
            element={<Reporthistoryprint />}
          />
          <Route path="/report/notifications" element={<Home />} />
          <Route path="/report/tax" element={<Home />} />
          <Route path="/report/pdf" element={<HowToPDF />} />
          {/* /////////////////////////////////////////////////////////////////////////////// */}
           <Route path="/user-salary" element={<User />} />
           <Route path="/form-receive-money" element={<KTBForm />} />
           <Route path="/manage-salary/import-export1715" element={<Uploadsalary1715 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
