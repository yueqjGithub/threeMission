import { useEffect, useRef } from 'react';
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
const Home = () => {
  const ref = useRef<HTMLDivElement>(null)
  const effectRef = useRef<boolean>(false)

  useEffect(() => {
    if (ref.current && !effectRef.current) {
      const scene = new Scene()
      const w = ref.current.clientWidth
      const h = ref.current.clientHeight
      const camera = new PerspectiveCamera(75, w / h, 0.1, 1000)
      const render = new WebGLRenderer()
      render.setSize(w, h)
      
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
      ref.current.appendChild(render.domElement)
      effectRef.current = true
      animate()
    }
  }, [])
  return (
    <div className="full-width full-height" ref={ref}>
      
    </div>
  )
}

export default Home
