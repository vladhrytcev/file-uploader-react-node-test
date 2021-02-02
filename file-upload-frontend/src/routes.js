import ClientPage from "./containers/ClientPage";
import AdminPage from "./containers/AdminPage";
import Login from "./containers/Login";

export const routes = [
  {
    component: ClientPage,
    path: "/client/:id",
  },
  {
    component: AdminPage,
    path: "/",
  },
  {
    component: Login,
    path: "/login",
  },
];
