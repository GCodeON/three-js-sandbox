'use client'
import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

export default function Canvas({children}) {

  const canvasRef = useRef();
  const scene = useMemo(() => new THREE.Scene(), []);
  let mounted = null;
  
  useEffect(() => {
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if(mounted) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    // Resize

    window.addEventListener( 'resize', () => {
      renderer.setSize( window.innerWidth, window.innerHeight );
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    } );

    const cursor = {
      x: 0,
      y: 0
    }
    window.addEventListener('mousemove', (event) => {
      cursor.x = - (event.clientX / window.innerWidth - 0.5);
      cursor.y = event.clientY / window.innerHeight - 0.5;
    })

    const animate = () => {
      camera.position.x = cursor.x * 10;
      camera.position.y = cursor.y * 10;
      camera.lookAt(new THREE.Vector3());

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      console.log('Component is unmounted');
      window.removeEventListener('resize', () => {});
      mounted = true;
    }

  }, [scene])

  return <div ref={canvasRef}>{children(scene)}</div>;
}