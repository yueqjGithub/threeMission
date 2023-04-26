import { RouteObject, useRoutes, useNavigate } from "react-router";

import LoginPage from "../pages/Login";
import PageLayout from "../layout/pageLayout";
import { lazy } from "react";
import LazyImportComponent from "../components/LazyImportComponent";

const Home = lazy(() => import('../pages/Home'))
const LinePage = lazy(() => import('../pages/Line'))
const Basic = lazy(() => import('../pages/Basic'))

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
        element: <LazyImportComponent lazyChildren={Home} />,
      },
      {
        path: 'line',
        element: <LazyImportComponent lazyChildren={LinePage} />,
      },
      {
        path: 'basic',
        element: <LazyImportComponent lazyChildren={Basic} />,
      },
      {
        index: true,
        element: <div onClick={() => {
          document.documentElement.style.setProperty('--color-primary', 'red')
        }}>THIS IS DEFAULT CONTENT</div>
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