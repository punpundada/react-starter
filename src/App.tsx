import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/demo/Demo";
import NotFound from "./pages/error/NotFound";
import Demand from "./pages/demand/demand/Demand";
import Authority from "./pages/demand/authority/Authority";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/auth/Login";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Dashboard />,
        index: true,
      },
      {
        path: "demand",
        children: [
          {
            path: "demand",
            element: <Demand />,
          },
          {
            path: "authority",
            element: <Authority />,
          },
        ],
      },
      {
        element: <Demo />,
        path: "demo",
        children: [
          {
            path: "demo",
            element: <Demo />,
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
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;

// function PrivateRoute({ children }: { children: React.ReactNode }) {
//   const user = useSelector(selectUser);

//   if (user) {
//     return children;
//   }
// }
