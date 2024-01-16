'use client'
import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

export default function Carousel3D({imageList, radius, width, height}) {

  const canvasRef = useRef();
  const scene = new THREE.Scene();
  const textureLoader = new THREE.TextureLoader();
  
  useEffect(() => {
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 500;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Resize

    window.addEventListener( 'resize', () => {
      renderer.setSize( window.innerWidth, window.innerHeight );
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    } );

    imageList.map((item, idx) => {
      buildCarousel(item, idx);
    })

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', () => {});
    }

  }, [])

  function buildCarousel(image, index) {
    const texture = textureLoader.load(image.src);
    const material = new THREE.MeshBasicMaterial( {
      map     : texture,
      side    : THREE.DoubleSide
    });
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height, 3, 3),
      material
    );
    const angle = index * (2 * Math.PI/imageList.length);

    plane.rotation.y = -angle - Math.PI/2;
    plane.position.set(radius * Math.cos(angle), radius * Math.sin(angle), 0);
    plane.doubleSided = true;
    plane.carouselAngle = angle;
    plane.scale.x = -1;
    
    scene.add(plane);
    
    console.log('plane', plane);
    // if(image.caption) {

    //  const size = (0.4) * (width/image.caption.length);
    //  const captionHeight = 2;
    //  const loader = new FontLoader();

    //  loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {

    //   const matLite = new THREE.MeshBasicMaterial({
    //     color      : 0xffffff,
    //     transparent: true,
    //     opacity    : 0.4,
    //     side       : THREE.DoubleSide
    //   });

    //   const message = image.caption;
    //   const shapes = font.generateShapes(message, 20);
    //   const geometry = new THREE.ShapeGeometry(shapes);
    //   const text = new THREE.Mesh( geometry, matLite);
    //   text.doubleSided = false;
    //   const textContainer = new THREE.Object3D();
    //   textContainer.add(text);

    //   textContainer.position.x = plane.position.x;
    //   textContainer.position.y = plane.position.y-size-0.5*captionHeight-5;
    //   textContainer.position.z = plane.position.z;
    //   textContainer.rotation.y = plane.rotation.y;
    //   text.scale.x = plane.scale.x;
    //   text.position.x = width * 0.5;
    
    //   scene.add(textContainer);

    // })

    // }


  }

  function rotateToItem(item, callback) {

  }

  return <canvas ref={canvasRef}></canvas>
}