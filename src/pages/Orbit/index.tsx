import { useRef, useEffect } from "react"
import * as THREE from "three"
// 引入轨道控制器扩展库
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const OrbitPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const effctRef = useRef<boolean>(false)
  useEffect(() => {
    if (!effctRef.current) {
      const sence = new THREE.Scene()

      const geometry = new THREE.BoxGeometry(100, 100, 100)

      const material = new THREE.MeshLambertMaterial({
        color: 'yellow'
      }) // 漫反射材质

      // const material = new THREE.MeshPhongMaterial() // 高光材质

      const render = new THREE.WebGLRenderer()
      
      const mesh = new THREE.Mesh(geometry, material)

      mesh.position.set(0, 0, 0)

      const w = ref.current?.clientWidth || 0
      const h = ref.current?.clientHeight || 0

      const camera = new THREE.PerspectiveCamera(45, w / h, 1, 2000)

      camera.position.set(300, 200,1700)
      camera.lookAt(0,0,0)

      sence.add(mesh)

      // 坐标系
      const axesHelper = new THREE.AxesHelper(200)
      sence.add(axesHelper)

      // 点光源
      // const pointLight = new THREE.PointLight(0xffffff, 1)
      // pointLight.position.set(100, 200, 0)
      // sence.add(pointLight)
      // // 点光源辅助观察
      // const pointLightHelpler = new THREE.PointLightHelper(pointLight, 10)
      // sence.add(pointLightHelpler)

      // 平行光
      const directionalLight = new THREE.DirectionalLight(0xffff00, 1)
      directionalLight.position.set(100, 200, 0)
      directionalLight.target = mesh
      sence.add(directionalLight)
      // 平行光辅助观察
      const directionalLightHelpler = new THREE.DirectionalLightHelper(directionalLight, 10)
      sence.add(directionalLightHelpler)

      // 环境光
      const ambientLight = new THREE.AmbientLight(0xff0000, 0.3)
      sence.add(ambientLight)

      // 设置相机控制器
      const controls = new OrbitControls(camera, render.domElement)

      render.setSize(w, h)
      const animate = () => {
        requestAnimationFrame(animate)
        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.01
        render.render(sence, camera)
      }
      ref.current?.appendChild(render.domElement)
      animate()
      effctRef.current = true
    }
  }, [])
  return (
    <div className="full-width full-height" ref={ref}></div>
  )
}

export default OrbitPage
