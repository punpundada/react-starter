import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/demo/Demo";
import NotFound from "./pages/error/NotFound";
import Demand from "./pages/demand/demand/Demand";
import Authority from "./pages/demand/authority/Authority";

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
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route element={<Dashboard/>} index />
            <Route element={<Demo/>} path='demo' />
          </Route>
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
