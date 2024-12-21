import { createBrowserRouter } from "react-router";
import App from "./App";
import CreateAdCategory, {
  loader as categoryLoader,
  action as categoryAction,
} from "./routes/create-ad/category";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-ad",
    element: <CreateAdCategory />,
    loader: categoryLoader,
    action: categoryAction,
  },
]);
