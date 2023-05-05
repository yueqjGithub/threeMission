import dat from "dat.gui"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Stats from "three/examples/jsm/libs/stats.module"

const WirePage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const effectRef = useRef<boolean>(false)
  useEffect(() => {
    if (!effectRef.current) {
      const w = ref.current?.clientWidth || 0
      const h = ref.current?.clientHeight || 0
      //  场景
      const sence = new THREE.Scene()
      sence.background = new THREE.Color(0x444400)
      // 相机
      const camera = new THREE.PerspectiveCamera(45, w/h, 1, 2000)
      camera.position.set(0, 0, 700)
      camera.lookAt(0, 0, 0)
      // 渲染器
      const render = new THREE.WebGLRenderer({
        antialias: true
      })
      render.setPixelRatio(window.devicePixelRatio)
      render.setSize(w, h)

      // 球体
      let geometry = new THREE.SphereGeometry(50, 10, 10)
      const material = new THREE.MeshPhongMaterial({
        color: 0xffff00,
        wireframe: true
      })
      const mesh = new THREE.Mesh(geometry, material)
      sence.add(mesh)

      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      sence.add(ambientLight)

      // 点光源
      const point = new THREE.PointLight(0xffffff, 1)
      point.position.set(200, 200, 100)
      sence.add(point)
      const pointLightHelper = new THREE.PointLightHelper(point, 10);
      sence.add(pointLightHelper);

      // GUI
      const gui = new dat.GUI()
      gui.domElement.style.position = 'absolute'
      gui.domElement.style.right = '0px'
      gui.domElement.style.top = '0px'
      const options = {
        wireframe: true,
        widthSegements: 10,
        heightSegements: 10
      }
      gui.add(options, 'wireframe').onChange((val) => {
        material.wireframe = val
        render.render(sence, camera)
      }).name('线框模式')
      const folder = gui.addFolder('模型精细度')
      // 这里属性搞到10000，可以感受到明显的卡顿，机子不行的要遭，莫怪我没提醒
      folder.add(options, 'widthSegements', 8, 100).onChange(val => {
        geometry = new THREE.SphereGeometry(50, val, options.heightSegements)
        mesh.geometry = geometry
        render.render(sence, camera)
      }).name('x')
      // 这里属性搞到10000，可以感受到明显的卡顿，机子不行的要遭，莫怪我没提醒
      folder.add(options, 'heightSegements', 8, 100).onChange(val => {
        geometry = new THREE.SphereGeometry(50, options.widthSegements, val)
        mesh.geometry = geometry
        render.render(sence, camera)
      }).name('y')

      // 相机轨道
      const orbit = new OrbitControls(camera, render.domElement)
      orbit.addEventListener('change', () => {
        render.render(sence, camera)
      })

      // FPS
      const stat = Stats()
      stat.domElement.style.position = 'absolute'
      stat.domElement.style.left = '0px'
      stat.domElement.style.top = '0px'
      ref.current?.appendChild(stat.domElement)

      const animate = () => {
        stat.update()
        requestAnimationFrame(animate)
      }
      animate()

      ref.current?.appendChild(render.domElement)
      ref.current?.appendChild(gui.domElement)
      render.render(sence, camera)

      effectRef.current = true
    }
  },[])
  return (
    <div className="full-width full-height pos-relative" ref={ref}></div>
  )
}

export default WirePage
