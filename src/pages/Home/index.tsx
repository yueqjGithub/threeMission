import { useEffect, useRef } from 'react';
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
const Home = () => {
  const ref = useRef<HTMLDivElement>(null)
  const scene = new Scene()
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const render = new WebGLRenderer()
  render.setSize(window.innerWidth, window.innerHeight)
  
  const geometry = new BoxGeometry( 1, 1, 1 );
  const material = new MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  const animate = () => {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    render.render( scene, camera );
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.appendChild(render.domElement)
      animate()
    }
  }, [ref.current])
  return (
    <div className="pageContainer" ref={ref}>
      
    </div>
  )
}

export default Home
