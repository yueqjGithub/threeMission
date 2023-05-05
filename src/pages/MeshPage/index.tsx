import dat from "dat.gui"
import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const MeshPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const effectRef = useRef<boolean>(false)
  useEffect(() => {
    if (!effectRef.current) {
      const w = ref.current?.clientWidth || 0
      const h = ref.current?.clientHeight || 0
      // 场景
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

      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      sence.add(ambientLight)

      // 点光源
      const point = new THREE.PointLight(0xffffff)
      point.position.set(400, 200, -300)
      sence.add(point)

      // 两面可见的材质
      const material = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide, //两面可见
        color: 0xffff00, //材质颜色
      });
      // 坐标集合
      const vertices = new Float32Array([
        0, 0, 0, //顶点1坐标
        80, 0, 0, //顶点2坐标
        80, 80, 0, //顶点3坐标
        0, 80, 0, //顶点4坐标
      ]);
      const indexes = new Uint16Array([
        // 下面索引值对应顶点位置数据中的顶点坐标
        0, 1, 2, 0, 2, 3,
      ])
      const normals = new Float32Array([
        0, 0, 1, //顶点1法线( 法向量 )
        0, 0, 1, //顶点2法线
        0, 0, 1, //顶点3法线
        0, 0, 1, //顶点4法线
      ]);

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
      geometry.index = new THREE.BufferAttribute(indexes, 1)
      geometry.attributes.normal = new THREE.BufferAttribute(normals, 3)
      const mesh = new THREE.Mesh(geometry, material)
      sence.add(mesh)

      
      // 相机轨道
      const orbit = new OrbitControls(camera, render.domElement)
      orbit.addEventListener('change', () => {
        render.render(sence, camera)
      })
      // GUI
      const gui = new dat.GUI()
      const controls = {
        wireframe: false
      }
      gui.domElement.style.position = 'absolute'
      gui.domElement.style.right = '0px'
      gui.domElement.style.top = '0px'
      gui.add(controls, 'wireframe').onChange((e) => {
        material.wireframe = e
        render.render(sence, camera)
      }).name('显示三角面')

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

export default MeshPage
