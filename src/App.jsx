import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layouts } from "./Layout/Layouts";
import Home from "./Components/Home";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layouts/>} >
        <Route path="/main-page" element={<Home/>}  />
        <Route path="/manage-salary/salary" element={<Home/>}  />
        <Route path="/manage-salary/revenue" element={<Home/>}  />
        <Route path="/manage-salary/expenses" element={<Home/>}  />
        <Route path="/manage-salary/add-revenue-fromtype" element={<Home/>} />
        <Route path="/manage-salary/add-expenses-fromtype" element={<Home/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
