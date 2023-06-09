import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/reset.css";

import { UserRoute } from "./middlewares/AuthRoute";

const LoginPage = lazy(() => import("./pages/Login"));
const HomePage = lazy(() => import("./pages/Home"));
const EmployeePage = lazy(() => import("./pages/Employee"));
const DepartementPage = lazy(() => import("./pages/Departement"));
const SpendingPage = lazy(() => import("./pages/Spending"));

// Page Add

const DepartementAdd = lazy(() => import("./pages/Departement/Add"));
const EmployeeAdd = lazy(() => import("./pages/Employee/Add"));
const SpendingAdd = lazy(() => import("./pages/Spending/Add"));

// Page Edit

const DepartementEdit = lazy(() => import("./pages/Departement/Edit"));
const EmployeeEdit = lazy(() => import("./pages/Employee/Edit"));
const SpendingEdit = lazy(() => import("./pages/Spending/Edit"));

function App() {
  return (
    <main>
      <BrowserRouter>
        <Suspense fallback={<></>}>
          <Routes>
            <Route element={<UserRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/employee" element={<EmployeePage />} />
              <Route path="/employee/add" element={<EmployeeAdd />} />
              <Route path="/employee/:id" element={<EmployeeEdit />} />
              <Route path="/departement" element={<DepartementPage />} />
              <Route path="/departement/add" element={<DepartementAdd />} />
              <Route path="/departement/:id" element={<DepartementEdit />} />
              <Route path="/spending" element={<SpendingPage />} />
              <Route path="/spending/add" element={<SpendingAdd />} />
              <Route path="/spending/:id" element={<SpendingEdit />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </main>
  );
}

export default App;
