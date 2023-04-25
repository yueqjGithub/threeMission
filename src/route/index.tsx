import { RouteObject, useRoutes, useNavigate } from "react-router";
import Home from "../pages/Home";
import LinePage from "../pages/Line";
import LoginPage from "../pages/Login";
import PageLayout from "../layout/pageLayout";
import Basic from "../pages/Basic";
const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <PageLayout></PageLayout>,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'line',
        element: <LinePage />
      },
      {
        path: 'basic',
        element: <Basic></Basic>
      },
      {
        index: true,
        element: <>THIS IS DEFAULT CONTENT</>
      }
    ]
  },
  {
    path: '*',
    element: <>THIS IS 404 PAGE</>
  }
]


const RouteWarpper = () => {
  const Wrapper = useRoutes(routeList)
  return Wrapper
}

export default RouteWarpper