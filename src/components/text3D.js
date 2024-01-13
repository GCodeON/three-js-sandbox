'use client'
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';


export default function Text3D({display, color}) {
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    
    camera.position.set(0, 0, 500);

    scene.background = new THREE.Color(0xf0f0f0);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const loader = new FontLoader();

    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {

      const matDark = new THREE.LineBasicMaterial({
        color: color,
        side : THREE.DoubleSide
      })

      const matLite = new THREE.MeshBasicMaterial({
        color      : color,
        transparent: true,
        opacity    : 0.4,
        side       : THREE.DoubleSide
      });

      const message = display;

      const shapes = font.generateShapes(message, 100);

      const geometry = new THREE.ShapeGeometry(shapes);

      geometry.computeBoundingBox();

      const xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

      geometry.translate(xMid, 0, 0);

      const text = new THREE.Mesh( geometry, matLite);
      text.position.z = -150;

      scene.add(text);

      const holeShapes = [];

      for(let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        if(shape.holes && shape.holes.length > 0) {

          for(let j = 0; j < shape.holes.length; j++) {
            const hole = shape.holes[j];
            holeShapes.push(hole);
          }
        }
      }

      shapes.push.apply(shapes, holeShapes);

      const lineText = new THREE.Object3D();
      

      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];
        const points = shape.getPoints();
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        geometry.translate(xMid, 0, 0);

        const lineMesh = new THREE.Line(geometry, matDark);
        lineText.add(lineMesh);
      }

      scene.add(lineText);

      renderer.render(scene, camera);

    })


    const controls = new OrbitControls(camera, renderer.domElement);

    controls.target.set(0, 0, 0);
    controls.update();

    controls.addEventListener('change', () => {renderer.render( scene, camera)})


    // const cursor = {
    //   x: 0,
    //   y: 0
    // }
    // window.addEventListener('mousemove', (event) => {
    //   cursor.x = - (event.clientX / window.innerWidth - 0.5);
    //   cursor.y = event.clientY / window.innerHeight - 0.5;
    // })


    window.addEventListener( 'resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
  
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.render(scene, camera);
    } );
    


    const animate = () => {
      // camera.position.x = cursor.x * 200;
      // camera.position.y = cursor.y * 200;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
    

  }, [])
  return <canvas ref={canvasRef}></canvas>
}