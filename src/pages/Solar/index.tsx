import dat from "dat.gui"
import { useRef, useEffect } from "react"
import * as THREE from "three"

const SolarSystem = () => {
  const ref = useRef<HTMLDivElement>(null)
  const effctRef = useRef<boolean>(false)
  useEffect(() => {
    if (!effctRef.current) {
      const w = ref.current?.clientWidth || 0
      const h = ref.current?.clientHeight || 0
      const options = {
        senceBackground: '#000000',
        renderClearColor: '#000000',
        ambientLightColor: '#ffffff',
        ambientLightIntensity: 0.4,
        starConut: 265
      }
      // 场景
      const sence = new THREE.Scene()
      sence.background = new THREE.Color(options.senceBackground)

      // 相机
      const camera = new THREE.PerspectiveCamera(45, w / h, 1, 2000)
      camera.position.set(0, 300, 800)
      camera.lookAt(0, 0, 0)

      // 渲染器
      const render = new THREE.WebGLRenderer({
        antialias: true
      })
      render.setPixelRatio(window.devicePixelRatio)
      render.setSize(w, h)

      // 环境光
      const ambientLight = new THREE.AmbientLight(options.ambientLightColor, options.ambientLightIntensity)
      sence.add(ambientLight)

      // AXESHELPLER
      const axesHelper = new THREE.AxesHelper(250)
      sence.add(axesHelper)

      // GUI
      const gui = new dat.GUI()
      gui.domElement.style.position = 'absolute'
      gui.domElement.style.right = '0px'
      gui.domElement.style.top = '0px'

      const basicFloder = gui.addFolder('基础')
      basicFloder.addColor(options, 'senceBackground').onChange((val) => {
        sence.background = new THREE.Color(val)
        render.render(sence, camera)
      }).name('场景背景色')
      basicFloder.addColor(options, 'renderClearColor').onChange((val) => {
        render.setClearColor(new THREE.Color(val), 1.0)
        render.render(sence, camera)
      }).name('渲染器背景色')
      basicFloder.addColor(options, 'ambientLightColor').onChange((val) => {
        ambientLight.color = new THREE.Color(val)
        render.render(sence, camera)
      }).name('环境光颜色')
      basicFloder.add(options, 'ambientLightIntensity', 0, 1).onChange((val) => {
        ambientLight.intensity = val
        render.render(sence, camera)
      }).name('环境光强度')

      // 生成星光点点
      let stars: any = null // 星星集合载体对象，如果放在函数drawstart内，会导致无法删除
      const drawStart = (count:number) => {
        const starDatas = genPoints(count, [w / -2, w / 2], [h / -2, h / 2], [-200, -1000])
        const starMaterial = new THREE.PointsMaterial({
          color: '#ffffff',
          size: Math.random() * 3 + 1,
        })
        const vertices: any[] = []
        starDatas.forEach(item => {
          vertices.push(item.x)
          vertices.push(item.y)
          vertices.push(item.z)
        })
        const starGeometry = new THREE.BufferGeometry()
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
        stars = new THREE.Points(starGeometry, starMaterial)
        sence.add(stars)
      }
      drawStart(options.starConut)
      // 控制背景星颗数等
      const starFloder = gui.addFolder('星空')
      starFloder.add(options, 'starConut', 0, 10000).onChange((val) => {
        sence.remove(stars)
        drawStart(val)
        render.render(sence, camera)
      })

      // 太阳系组
      const solarSystemGroup = new THREE.Group()
      solarSystemGroup.position.set(0, 0, 0)

      // 太阳
      const sunGeometry = new THREE.SphereGeometry(150, 80, 80)
      const sunMaterial = new THREE.MeshLambertMaterial({
        color: '#ffff00',
        wireframe: false,
      })
      const sun = new THREE.Mesh(sunGeometry, sunMaterial)
      sun.position.set(0, 0, 0)

      // 地球
      const earthMaterial = sunMaterial.clone()
      earthMaterial.color = new THREE.Color('#0000ff')
      const earthGeometry = new THREE.SphereGeometry(50, 80, 80)
      const earth = new THREE.Mesh(earthGeometry, earthMaterial)
      earth.position.set(350, 0, 0)

      // 添加进太阳系
      solarSystemGroup.add(sun)
      solarSystemGroup.add(earth)
      sence.add(solarSystemGroup)

      ref.current?.appendChild(render.domElement)
      ref.current?.appendChild(gui.domElement)
      render.render(sence, camera)
      effctRef.current = true
    }
  }, [effctRef])
  const genPoints = (
    count: number,
    xLimit: number[],
    yLimit: number[],
    zLimit: number[],
  ) => {
    const result: any[] = []
    for (let i = 0; i <= count; i++) {
      result.push({
        color: '#ffffff',
        lighting: Math.random(),
        x: Math.random() * (xLimit[1] - xLimit[0]) + xLimit[0],
        y: Math.random() * (yLimit[1] - yLimit[0]) + yLimit[0],
        z: Math.random() * (zLimit[1] - zLimit[0]) + zLimit[0],
      })
    }
    return result
  }
  return (
    <div className="full-width full-height flex-col flex-jst-start flex-ali-start">
      <div className='controlContainer flex-row flex-jst-btw flex-ali-center'>
        <p>tips:本page文档对应知识：层级模型</p>
      </div>
      <div className='full-width flex-1' ref={ref} style={{ position: 'relative' }}></div>
    </div>
  )
}

export default SolarSystem
