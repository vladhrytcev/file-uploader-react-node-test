import ClientPage from "./pages/ClientPage";
import AdminPage from "./pages/AdminPage";

export const routes = [
  {
    component: ClientPage,
    path: "/client",
  },
  {
    component: AdminPage,
    path: "/",
  },
];
