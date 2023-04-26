import { useEffect, useRef } from "react"
import * as THREE from "three"

const BasicPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const effectRef = useRef<boolean>(false)
  useEffect(() => {
    if (!effectRef.current) {
      const scene = new THREE.Scene()
      const geometry = new THREE.BoxGeometry(100, 100, 100)
      // const cylinder = new THREE.CylinderGeometry(50, 50, 100, 32)
      // const sphere = new THREE.SphereGeometry(50, 32, 32)
      // const cone = new THREE.ConeGeometry(50, 100, 32)
      // const plane = new THREE.PlaneGeometry(100, 100, 32)
      // const circle = new THREE.CircleGeometry(50, 32)

      // 材质
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.5,
      })
      // const material1 = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
      // const material2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
      // const material3 = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
      // const material4 = new THREE.MeshPhysicalMaterial({ color: 0x00ff00 })
      // 网格模型
      const mesh = new THREE.Mesh(geometry, material)
      // const cylinderMesh = new THREE.Mesh(cylinder, material1)
      // const sphereMesh = new THREE.Mesh(sphere, material2)
      // const coneMesh = new THREE.Mesh(cone, material3)
      // const planeMesh = new THREE.Mesh(plane, material4)
      // const circleMesh = new THREE.Mesh(circle, material4)
      mesh.position.set(0, 0, 0)
      // cylinderMesh.position.set(50, 0, 0)
      // sphereMesh.position.set(100, 0, 0)
      // coneMesh.position.set(150, 0, 0)
      // planeMesh.position.set(200, 0, 0)
      // circleMesh.position.set(250, 0, 0)

      // 添加进场景
      scene.add(mesh)
      // scene.add(cylinderMesh)
      // scene.add(sphereMesh)
      // scene.add(coneMesh)
      // scene.add(planeMesh)
      // scene.add(circleMesh)

      // 相机
      const w = ref.current?.clientWidth || 0
      const h = ref.current?.clientHeight || 0
      const camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000)
      camera.position.set(150, 0, 500)
      camera.lookAt(150, 0, 0)

      // 渲染器
      const render = new THREE.WebGLRenderer()
      render.setSize(w, h)

      // render.render(scene, camera)

      // 坐标系
      const axesHelper = new THREE.AxesHelper(250);
      scene.add(axesHelper);

      const animate = () => {
        requestAnimationFrame(animate)
        // camera.position.x += 1 // 动相机
        mesh.rotation.z += 0.01 // 转动物体
        // mesh.rotation.y += 0.1 // 转动物体z
        // mesh.position.z += 0.1 // 移动物体
        render.render(scene, camera)
      }
      render.render(scene, camera)
      ref.current?.appendChild(render.domElement)
      animate()
      effectRef.current = true
    }
  }, [])
  return (
    <div className="full-width full-height" ref={ref}></div>
  )
}

export default BasicPage
