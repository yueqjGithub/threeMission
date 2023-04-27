import { useEffect, useRef } from "react"
import * as THREE from "three"

const LightPage = () => {
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

      const camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000)

      camera.position.set(300, 200,700)
      camera.lookAt(0,0,0)

      sence.add(mesh)

      // 坐标系
      const axesHelper = new THREE.AxesHelper(200)
      sence.add(axesHelper)

      // 光源
      const pointLight = new THREE.PointLight(0xffffff, 0.4)
      pointLight.position.set(400, 200, 300)

      sence.add(pointLight)

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

export default LightPage
