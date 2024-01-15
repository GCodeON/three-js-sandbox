'use client'
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

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


    window.addEventListener( 'resize', () => {
      renderer.setSize( window.innerWidth, window.innerHeight );
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
  
      renderer.setSize( window.innerWidth, window.innerHeight );
    } );

    const cursor = {
      x: 0,
      y: 0
    }
    window.addEventListener('mousemove', (event) => {
      cursor.x = - (event.clientX / window.innerWidth - 0.5);
      cursor.y = event.clientY / window.innerHeight - 0.5;
    })

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      group.rotation.x = Math.sin(elapsedTime);
      group.position.y = Math.cos(elapsedTime);
      group.position.x = Math.sin(elapsedTime);

      camera.position.x = cursor.x * 10;
      camera.position.y = cursor.y * 10;
      camera.lookAt(new THREE.Vector3());

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

  }, [])
  return <canvas ref={canvasRef}></canvas>
}