import ClientPage from "./containers/ClientPage";
import AdminPage from "./containers/AdminPage";

export const routes = [
  {
    component: ClientPage,
    path: "/client/:id",
  },
  {
    component: AdminPage,
    path: "/",
  },
];
