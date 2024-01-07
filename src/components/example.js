'use client'
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Example() {
  const canvasRef = useRef();

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    const group = new THREE.Group();
    scene.add(group);

    // Object
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000});
    const cube = new THREE.Mesh(geometry, material);
    
    cube.position.x = -2;

    group.add(cube)

    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshBasicMaterial({ color: 0x0000ff})
    )
    group.add(cube2);

    const cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00})
    )
    cube3.position.x = 2;
    group.add(cube3);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Helpers
    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    // Resize
    function onWindowResize() {
      renderer.setSize( window.innerWidth, window.innerHeight );
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
  
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    window.addEventListener( 'resize', onWindowResize );

    const clock = new THREE.Clock();

    gsap.to(cube.position, {
      x       : 2,
      duration: 1,
      delay   : 1
    })
    gsap.to(cube.position, {
      x       : -2,
      duration: 1,
      delay   : 2
    })

    const animate = () => {
      // const elapsedTime = clock.getElapsedTime();

      // group.rotation.x = Math.sin(elapsedTime);
      // group.position.y = Math.cos(elapsedTime);
      // group.position.x = Math.sin(elapsedTime);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

  }, [])
  return <canvas ref={canvasRef}></canvas>
}