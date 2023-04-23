import { useEffect, useRef } from "react"
import * as THREE from 'three'
const LinePage = () => {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (ref.current) {
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      

      const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
      camera.position.set( 0, 0, 100 );
      camera.lookAt( 0, 0, 0 );

      const scene = new THREE.Scene();
      ref.current?.appendChild( renderer.domElement );
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
    <div ref={ref}></div>
  )
}

export default LinePage
