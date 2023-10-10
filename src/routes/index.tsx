import { createHashRouter } from "react-router-dom";
import App from "../App";

const routes = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
]);

export default routes;
