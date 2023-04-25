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
          <li><Link to={'/home'}>HOME</Link></li>
          <li><Link to={'/line'}>LINE</Link></li>
          <li><Link to={'/basic'}>BASIC</Link></li>
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
