import { useEffect } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import styles from './layout.module.scss'
const PageLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { pathname } = location
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token && pathname !== '/login') {
      navigate('/login', {
        replace: true
      })
    }
  }, [pathname])
  return (
    <div className="pageContainer flex-row flex-jst-btw flex-ali-center">
      <div className={`${styles.menuContainer} full-height`}>
        <ul>
          <li><Link className="text-primary" to={'/home'}>HOME</Link></li>
          <li><Link className="text-primary" to={'/line'}>LINE</Link></li>
          <li><Link className="text-primary" to={'/basic'}>BASIC</Link></li>
          <li><Link className="text-primary" to={'/light'}>Light（光和漫反射材质）</Link></li>
          <li><Link className="text-primary" to={'/orbit'}>Orbit（各种辅助控件）</Link></li>
          <li><Link className="text-primary" to={'/stat'}>stat（渲染帧率查看）</Link></li>
          <li><Link className="text-primary" to={'/gui'}>GUI</Link></li>
        </ul>
      </div>
      <div className={`${styles.contentContainer} flex-1 full-height`}>
        <div className={`${styles.contentOutlet} full-height scroll-bar`}>
        <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}

export default PageLayout
