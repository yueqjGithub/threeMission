import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Stats from "three/examples/jsm/libs/stats.module"
import * as dat from 'dat.gui'
const GuiPage = () => {
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
      camera.position.set(0, 0, 700)
      camera.lookAt(0, 0, 0)
      const render = new THREE.WebGLRenderer({
        // 抗锯齿
        antialias: true
      })
      render.setPixelRatio(window.devicePixelRatio)
      render.setSize(w, h)
      // render.setClearColor(0x004444, 1.0)

      const geometry = new THREE.BoxGeometry(50, 50, 50)
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff
      })
      // 解开注释，可看到fps显著下降，机子好当我没说
      // for (let k = 0; k < 500000; k++) {
      //   const mesh = new THREE.Mesh(geometry, material)
      //   mesh.position.set(0, (k + 1) * 2, 0)
      //   sence.add(mesh)
      // }
      const mesh = new THREE.Mesh(geometry, material)
      sence.add(mesh)
      // 点光源
      const pointLight = new THREE.PointLight(0xffffff, 1)
      pointLight.position.set(100, 200, 0)
      sence.add(pointLight)

      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      sence.add(ambientLight)

      // FPS显示
      statObj.current = Stats()
      statObj.current.domElement.style.position = 'absolute'
      statObj.current.domElement.style.left = '0px'
      statObj.current.domElement.style.top = '0px'
      // 相机控制器
      // new OrbitControls(camera, render.domElement)
      // GUI
      const gui = new dat.GUI()
      gui.domElement.style.position = 'absolute'
      gui.domElement.style.right = '0px'
      gui.domElement.style.top = '0px'

      const obj = {
        x: 0,
        y: 0,
        z: 0,
        ambientLight: 0.5,
        pointLight: 1,
        color: '#ffffff'
      }
      gui.add(obj, 'x', -200, 200).onChange((v) => {
        mesh.position.x = v
        render.render(sence, camera)
      })
      gui.add(obj, 'y', -200, 200).onChange((v) => {
        mesh.position.y = v
        render.render(sence, camera)
      })
      gui.add(obj, 'z', -500, 500).onChange((v) => {
        mesh.position.z = v
        render.render(sence, camera)
      })
      // gui.add(obj, 'ambientLight', 0, 1).onChange((v) => {
      //   ambientLight.intensity = v
      //   render.render(sence, camera)
      // }).name('环境光强度')
      // gui.add(obj, 'pointLight', 0, 1).onChange((v) => {
      //   pointLight.intensity = v
      //   render.render(sence, camera)
      // }).name('点光源强度')
      // gui.addColor(obj, 'color').onChange(function(value){
      //   mesh.material.color.set(value);
      //   render.render(sence, camera)
      // }).name('材质颜色');

      // GUI子菜单
      const power = gui.addFolder('光&材质')
      power.add(obj, 'ambientLight', 0, 1).onChange((v) => {
        ambientLight.intensity = v
        render.render(sence, camera)
      }).name('环境光强度')
      power.add(obj, 'pointLight', 0, 1).onChange((v) => {
        pointLight.intensity = v
        render.render(sence, camera)
      }).name('点光源强度')
      power.addColor(obj, 'color').onChange(function (value) {
        mesh.material.color.set(value);
        render.render(sence, camera)
      }).name('材质颜色');

      const animate = () => {
        statObj.current.update()
        mesh.rotation.x += 0.02
        mesh.rotation.y += 0.01
        render.render(sence, camera)
        requestAnimationFrame(animate)
      }
      animate()
      ref.current?.appendChild(statObj.current.domElement)
      ref.current?.appendChild(gui.domElement)
      ref.current?.appendChild(render.domElement)
      effctRef.current = true
    }
  }, [])
  return (
    <div className="full-width full-height flex-col flex-jst-start flex-ali-start">
      <div className='controlContainer flex-row flex-jst-btw flex-ali-center'>
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
        <div className="text-error">
          ambientLignt: 环境光 pointLight: 点光源
        </div>
      </div>
      <div className='full-width flex-1' ref={ref} style={{ position: 'relative' }}></div>
    </div>
  )
}

export default GuiPage
