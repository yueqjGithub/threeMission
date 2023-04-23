import { RouteObject, useRoutes, useNavigate } from "react-router";
import Home from "../pages/Home";
import LinePage from "../pages/Line";

const routeList: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/line',
    element: <LinePage></LinePage>
  }
]

const RouteWarpper = () => {
  const Wrapper = useRoutes(routeList)
  const navigate = useNavigate()
  const to = (path: string) => {
    navigate(path)
  }
  return (
    <>
      <div className="pageContainer flex-row flex-jst-start flex-ali-start">
        <div className="menu">
          <ul>
            <li onClick={() => to('/')}>home</li>
            <li onClick={() => to('/line')}>line</li>
          </ul>
        </div>
        <div className="flex-1">{Wrapper}</div>
      </div>
    </>
  )
}

export default RouteWarpper