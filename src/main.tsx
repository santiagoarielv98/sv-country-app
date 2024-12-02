import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./app/store.ts";
import App from "./App.tsx";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/serviceWorker.js", { scope: "/" }).then(
      (registration) => {
        console.log("ServiceWorker registration successful with scope: ", registration.scope);
      },
      (error) => {
        console.log("ServiceWorker registration failed: ", error);
      },
    );
  });
}
