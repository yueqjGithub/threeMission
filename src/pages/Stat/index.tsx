import { useRef, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const statPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const effctRef = useRef<boolean>(false)
  const statObj = useRef<any>(null)
  const [showStat, setShowStat] = useState<boolean>(true)

  useEffect(() => {
    if (!effctRef.current) {
      const sence = new THREE.Scene()
      const w = ref.current?.clientWidth || 0
      const h = ref.current?.clientHeight || 0
      const camera = new THREE.PerspectiveCamera(45, w / h, 1, 2000)
      camera.position.set(300, 200,1700)
      camera.lookAt(0,0,0)
      const render = new THREE.WebGLRenderer({
        // 抗锯齿
        antialias: true
      })
      render.setPixelRatio(window.devicePixelRatio)
      render.setSize(w, h)
      render.setClearColor(0x004444, 1.0)

      const geometry = new THREE.BoxGeometry(50, 50, 50)
      const material = new THREE.MeshLambertMaterial()
      // 解开注释，可看到fps显著下降，机子好当我没说
      // for (let k = 0; k < 500000; k++) {
      //   const mesh = new THREE.Mesh(geometry, material)
      //   mesh.position.set(0, (k + 1) * 2, 0)
      //   sence.add(mesh)
      // }
      const mesh = new THREE.Mesh(geometry, material)
      sence.add(mesh)
      // 点光源
      const pointLight = new THREE.PointLight(0xffffff, 0.7)
      pointLight.position.set(100, 200, 0)
      sence.add(pointLight)

      // 环境光
      const ambientLight = new THREE.AmbientLight(0x004444, 0.5)
      sence.add(ambientLight)

      statObj.current = Stats()
      statObj.current.domElement.style.position = 'absolute'
      statObj.current.domElement.style.left = '0px'
      statObj.current.domElement.style.top = '0px'
      new OrbitControls(camera, render.domElement)
      const animate = () => {
        statObj.current.update()
        mesh.rotation.x += 0.02
        mesh.rotation.y += 0.01
        render.render(sence, camera)
        requestAnimationFrame(animate)
      }
      animate()
      ref.current?.appendChild(statObj.current.domElement)
      ref.current?.appendChild(render.domElement)
      effctRef.current = true
    }
  },[])
  return (
    <div className="full-width full-height flex-col flex-jst-start flex-ali-start">
      <div className={styles.controlContainer}>
        <button onClick={() => {
          // showStat ? ref.current?.removeChild(statObj.current.domElement) : ref.current?.appendChild(statObj.current.domElement)
          if (showStat) {
            ref.current?.removeChild(statObj.current.domElement)
            setShowStat(false)
          } else {
            ref.current?.appendChild(statObj.current.domElement)
            setShowStat(true)
          }
        }}>开启/关闭帧率显示</button>
      </div>
      <div className='full-width flex-1' ref={ref} style={{position: 'relative'}}></div>
    </div>
  )
}

export default statPage
