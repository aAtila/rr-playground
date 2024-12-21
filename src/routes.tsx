import { createBrowserRouter } from "react-router";
import App from "./App";
import CreateAdCategory, {
  loader as categoryLoader,
  action as categoryAction,
} from "./routes/create-ad/category";
import CreateAdForm, {
  loader as formLoader,
  action as formAction,
} from "./routes/create-ad/form";

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
  {
    path: "/create-ad/:id",
    element: <CreateAdForm />,
    loader: formLoader,
    action: formAction,
  },
]);
