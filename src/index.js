import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginView from "./page/LoginView";
import DashboardView from "./page/DashboardView";
import EditProfileView from "./page/EditProfileView";
import SingOutView from "./page/SingOutView";
import PublicProfileView from "./page/PublicProfileView";
import ChooseUsernameView from "./page/ChooseUsernameView";
import ErrorView from "./page/ErrorView";
import NewEmployer from "./pagedashboard/NewEmployer";
import NewProduct from "./pagedashboard/NewProduct";
import UpdateStock from "./pagedashboard/UpdateStock";
import CreateReport from "./pagedashboard/CreateReport";
import CreatePedido from "./pagedashboard/CreatePedido";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="login" element={<LoginView />} />
            <Route path="dashboard" element={<DashboardView />} />
            <Route path="dashboard/profile" element={<EditProfileView />} />
            <Route path="signout" element={<SingOutView />} />
            <Route path="u/:username" element={<PublicProfileView />} />
            <Route path="choose-username" element={<ChooseUsernameView />} />
            <Route path="*" element={<ErrorView />}></Route>

            <Route path="createemploye" element={<NewEmployer />}></Route>
            <Route path="createproduct" element={<NewProduct />}></Route>
            <Route path="updateproduct" element={<UpdateStock />}></Route>
            <Route path="createreport" element={<CreateReport />}></Route>
            <Route path="createorder" element={<CreatePedido />}></Route>
        </Routes>
    </BrowserRouter>
);
