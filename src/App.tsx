import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/error/NotFound";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import Login from "./pages/auth/Login";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./components/theme-provider";
import Groups from "./pages/groups/Groups";
import Ledger from "./pages/ledger/Ledger";
import Gatepass from "./pages/scheduling/gatepass/Gatepass";
import StoreReceipt from "./pages/scheduling/store-receipt/StoreReceipt";
import Observations from "./pages/observations/Observations";
import InteractiveTreeCanvas from "./pages/tree/Tree";
import WarrentOfStores from "./pages/wos/WarrentOfStores";
import WOSLine from "./pages/wos/wos-line/WOSLine";
import WOSResponse from "./pages/wos/wos-response/WOSResponse";
import { queryClient } from "./lib/constants";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Spinner } from "./components/ui/spinner";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Dashboard />,
        index: true,
      },
      {
        path: "groups",
        element: <Groups />,
      },
      {
        path: "ledger",
        element: <Ledger />,
      },
      {
        path: "observations",
        element: <Observations />,
      },
      {
        path: "tree",
        element: <InteractiveTreeCanvas />,
      },
      {
        path: "scheduling",
        children: [
          {
            path: "gatepass",
            element: <Gatepass />,
          },
          {
            path: "store-receipt",
            element: <StoreReceipt />,
          },
        ],
      },
      {
        path: "wos",
        children: [
          {
            element: <WarrentOfStores />,
            index: true,
          },
          {
            element: <WOSLine />,
            path: ":wosserial",
          },
          {
            element: <WOSResponse />,
            path: "response/:wosserial",
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light">
            <PersistGate
              persistor={persistor}
              loading={
                <div className="w-screen h-screen flex justify-center items-center select-none">
                  <Spinner className="w-16"/>
                </div>
              }
            >
              <RouterProvider router={router} />
            </PersistGate>
            <Toaster richColors closeButton position="top-right" />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;