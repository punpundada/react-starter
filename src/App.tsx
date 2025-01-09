import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/demo/Demo";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element:<Dashboard/>,
        index:true,
      },
      {
        element:<Demo/>,
        path:"demo",
        children:[
          {
            path:"demo",
            element:<Demo/>
          },
        ]
      },
    ],
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
