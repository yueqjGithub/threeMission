import { useEffect, useRef } from "react"
import * as THREE from 'three'
const LinePage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const effectRef = useRef<boolean>(false)
  useEffect(() => {
    if (ref.current && !effectRef.current) {
      const renderer = new THREE.WebGLRenderer();
      const w = ref.current.clientWidth
      const h = ref.current.clientHeight
      renderer.setSize( w, h );
      

      const camera = new THREE.PerspectiveCamera( 45, w / h, 1, 500 );
      camera.position.set( 0, 0, 100 );
      camera.lookAt( 0, 0, 0 );

      const scene = new THREE.Scene();
      ref.current?.appendChild( renderer.domElement );
      effectRef.current = true
      //create a blue LineBasicMaterial
      const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
      const points = [];
      points.push( new THREE.Vector3( - 10, 0, 0 ) );
      points.push( new THREE.Vector3( 0, 10, 0 ) );
      points.push( new THREE.Vector3( 0, 0, 0 ) );
      points.push( new THREE.Vector3( 10, 0, 0 ) );

      const geometry = new THREE.BufferGeometry().setFromPoints( points );
      const line = new THREE.Line( geometry, material );
      scene.add( line );
      renderer.render( scene, camera );
    }
  }, [ref])
  return (
    <div ref={ref} className="full-width full-height"></div>
  )
}

export default LinePage
