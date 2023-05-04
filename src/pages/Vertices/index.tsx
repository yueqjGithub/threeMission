import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const VerticesPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const effectRef = useRef<boolean>(false)
  useEffect(() => {
    if (!effectRef.current) {
      const w = ref.current?.clientWidth || 0
      const h = ref.current?.clientHeight || 0
      const render = new THREE.WebGLRenderer()
      render.setClearColor(0x004444, 1.0)

      const sence = new THREE.Scene()
      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      sence.add(ambientLight)

      const camera = new THREE.PerspectiveCamera(45, w/h, 1, 2000)
      camera.position.set(0,0,700)
      camera.lookAt(0,0,0)
      render.setPixelRatio(window.devicePixelRatio)
      render.setSize(w, h)
      
      // 创建一个空的几何体
      const geo = new THREE.BufferGeometry()
      // 定义几何体顶点数据
      const vertices = new Float32Array([
        0, 0, 0, //顶点1坐标
        50, 0, 0, //顶点2坐标
        0, 100, 0, //顶点3坐标
        0, 0, 10, //顶点4坐标
        0, 0, 100, //顶点5坐标
        50, 0, 10, //顶点6坐标
      ]);
      // 创建属性缓冲区对象
      //3个为一组，表示一个顶点的xyz坐标
      const attribue = new THREE.BufferAttribute(vertices, 3);

      geo.attributes.position = attribue
      // mesh渲染
      // const material = new THREE.MeshPhongMaterial()
      // const points = new THREE.Mesh(geo, material)
      
      // 点渲染模式
      // const material = new THREE.PointsMaterial({
      //   color: 0xffff00,
      //   size: 10.0 //点对象像素尺寸
      // }); 
      // const points = new THREE.Points(geo, material); //点模型对象

      // 线材质对象
      const material = new THREE.LineBasicMaterial({
        color: 0xff0000 //线条颜色
      }); 
      // 创建线模型对象
      const points = new THREE.Line(geo, material);

      points.position.set(0, 0, 0); //设置点对象位置

      sence.add(points); //点对象添加到场景中
      
      ref.current?.appendChild(render.domElement)
      render.render(sence, camera)

      const orbit = new OrbitControls(camera, render.domElement)
      orbit.addEventListener('change', () => {
        render.render(sence, camera)
      })
    }
  }, [])
  return (
    <div className="full-width full-height" ref={ref}></div>
  )
}

export default VerticesPage
