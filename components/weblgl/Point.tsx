import {FC, useEffect, useRef, useState} from 'react';
import * as THREE from 'three';

type Props = {
  shader: string
  border?: number
}
export const WebglPoint: FC<Props> = (
  {
    shader,
  },
) => {
  const ref = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const [material] = useState<THREE.ShaderMaterial>(() => new THREE.ShaderMaterial());
  useEffect(() => {
    const container = ref.current;
    if (!container) {
      return;
    }
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
    const scene = new THREE.Scene();
    const geometry = new THREE.BufferGeometry();
    const positions = [0, 0, 0];
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.computeBoundingSphere();
    material.vertexShader = `void main() {
  gl_PointSize = 200.0;
  gl_Position = vec4(position, 1.0);
}`;
    material.transparent = true;

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const renderer = new THREE.WebGLRenderer();
    rendererRef.current = renderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(300, 300);

    container.appendChild(renderer.domElement);

    animate();

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      renderer.render(scene, camera);
    }

    return () => {
      rendererRef.current = undefined;
      material.dispose();
      renderer.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    material.fragmentShader = shader.replace(`#include <default_main>`, `
void main() {
  vec2 p = 2.0 * gl_PointCoord.xy - 1.0;
  p.y = -p.y;
  float distance = dist(p) / 0.9;
  if (distance > 1.0) {
    discard;
  }
  float boardFactor = smoothstep(0.85, 0.9, distance);
  gl_FragColor =
    (boardFactor * vec4(1.0, 1.0, 0.0, 1.0)) +
    ((1.0 - boardFactor) * vec4(0.0, 0.5, 1.0, 1.0));
    
  gl_FragColor.a = gl_FragColor.a * (1.0 - smoothstep(
    0.98,
    1.0,
    distance
  ));
}`);
    material.needsUpdate = true;
  }, [shader]);
  return (
    <div className={''}>
      <div
        ref={ref}
        className={'w-[300px] h-[300px]'}
      />
    </div>
  );
};