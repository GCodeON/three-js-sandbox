import React, { useEffect } from 'react';
import * as THREE from 'three';

export default function SphereComponent ({ scene }) {
  useEffect(() => {
    // Create a sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32), 
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    )
    sphere.position.y = 2;

    // Add the sphere to the scene
    scene.add(sphere);

    // Clean up on component unmount
    return () => {
      scene.remove(sphere);
    };
  }, [scene]);

  return null; // No need to render anything in this component
};