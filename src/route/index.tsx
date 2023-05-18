import { RouteObject, useRoutes, useNavigate } from "react-router";

import LoginPage from "../pages/Login";
import PageLayout from "../layout/pageLayout";
import { lazy, useEffect } from "react";
import LazyImportComponent from "../components/LazyImportComponent";

const Home = lazy(() => import('../pages/Home'))
const LinePage = lazy(() => import('../pages/Line'))
const Basic = lazy(() => import('../pages/Basic'))
const Light = lazy(() => import('../pages/Light'))
const Orbit = lazy(() => import('../pages/Orbit'))
const Stat = lazy(() => import('../pages/Stat'))
const GuiPage = lazy(() => import('../pages/GuiPage'))
const VerticesPage = lazy(() => import('../pages/Vertices'))
const MeshPage = lazy(() => import('../pages/MeshPage'))
const RedirectComponent = (props: { to: string }) => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(props.to, {
      replace: true
    })
  }, [])
  return null
}

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
        path: 'light',
        element: <LazyImportComponent lazyChildren={Light}/>,
      },
      {
        path: 'orbit',
        element: <LazyImportComponent lazyChildren={Orbit}/>,
      },
      {
        path: 'stat',
        element: <LazyImportComponent lazyChildren={Stat}/>,
      },
      {
        path: 'gui',
        element: <LazyImportComponent lazyChildren={GuiPage}/>,
      },
      {
        index: true,
        // element: <div onClick={() => {
        //   document.documentElement.style.setProperty('--color-primary', 'red')
        // }}>THIS IS DEFAULT CONTENT</div>
        element: <RedirectComponent to="/home" />
      }
    ]
  },
  {
    path: '/geometry',
    element: <PageLayout></PageLayout>,
    children: [
      {
        path: 'vertices',
        element: <LazyImportComponent lazyChildren={VerticesPage} />,
      },
      {
        path: 'meshpage',
        element: <LazyImportComponent lazyChildren={lazy(() => import('../pages/MeshPage'))} />,
      },
      {
        path: 'wire',
        element: <LazyImportComponent lazyChildren={lazy(() => import('../pages/WirePage'))} />,
      }
    ]
  },
  {
    path: '/solarSystem',
    element: <PageLayout></PageLayout>,
    children: [
      {
        path: 'solar',
        element: <LazyImportComponent lazyChildren={lazy(() => import('../pages/Solar'))} />,
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