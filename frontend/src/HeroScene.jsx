import { useEffect, useRef } from "react";
import * as THREE from "three";

function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (_error) {
      mount.classList.add("hero-scene-fallback");
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.2, 7);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    const pointer = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Vector2(0, 0);

    const pinkLight = new THREE.PointLight(0xff4fb8, 4, 18);
    pinkLight.position.set(-3, 2.5, 4);
    scene.add(pinkLight);

    const cyanLight = new THREE.PointLight(0x2cf7ff, 2.6, 18);
    cyanLight.position.set(3, -1.2, 4);
    scene.add(cyanLight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    const makeMaterial = (color, emissive = color, intensity = 0.35) =>
      new THREE.MeshStandardMaterial({
        color,
        emissive,
        emissiveIntensity: intensity,
        metalness: 0.45,
        roughness: 0.28
      });

    const runnerMaterial = makeMaterial(0xff4fb8, 0x6b0b48, 0.7);
    const shoeMaterial = makeMaterial(0x2cf7ff, 0x063f45, 0.8);
    const creamMaterial = makeMaterial(0xffd6ef, 0xff4fb8, 0.35);
    const coneMaterial = makeMaterial(0xf7c85f, 0x7a4b08, 0.25);
    const cursorMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.86
    });
    const accentGroup = new THREE.Group();
    scene.add(accentGroup);

    const addRunner = () => {
      const runner = new THREE.Group();
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 18, 18), runnerMaterial);
      head.position.y = 0.55;
      runner.add(head);
      const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.42, 8, 16), runnerMaterial);
      torso.position.y = 0.2;
      torso.rotation.z = -0.18;
      runner.add(torso);
      [
        [-0.24, 0.2, 0.9],
        [0.24, 0.2, -0.9],
        [-0.18, -0.28, -0.65],
        [0.2, -0.28, 0.72]
      ].forEach(([x, y, zRotation]) => {
        const limb = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, 0.46, 6, 12), shoeMaterial);
        limb.position.set(x, y, 0);
        limb.rotation.z = zRotation;
        runner.add(limb);
      });
      runner.position.set(-2.55, 1.25, 0.4);
      runner.scale.setScalar(0.95);
      accentGroup.add(runner);
      return runner;
    };

    const addShoe = () => {
      const shoe = new THREE.Group();
      const sole = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.16, 0.26), shoeMaterial);
      sole.position.y = -0.08;
      shoe.add(sole);
      const upper = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.22, 0.28), runnerMaterial);
      upper.position.set(-0.06, 0.08, 0);
      upper.rotation.z = -0.14;
      shoe.add(upper);
      const toe = new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 18), shoeMaterial);
      toe.scale.set(1.45, 0.68, 0.74);
      toe.position.set(0.38, 0.01, 0);
      shoe.add(toe);
      shoe.position.set(2.55, 1.08, -0.15);
      shoe.rotation.set(0.24, -0.4, -0.2);
      accentGroup.add(shoe);
      return shoe;
    };

    const addIceCream = () => {
      const treat = new THREE.Group();
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.62, 4), coneMaterial);
      cone.position.y = -0.26;
      cone.rotation.y = Math.PI / 4;
      treat.add(cone);
      const scoop = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 24), creamMaterial);
      scoop.position.y = 0.13;
      treat.add(scoop);
      const cherry = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), runnerMaterial);
      cherry.position.set(0.08, 0.45, 0.04);
      treat.add(cherry);
      treat.position.set(2.75, -1.45, 0.35);
      treat.rotation.z = 0.25;
      accentGroup.add(treat);
      return treat;
    };

    const runner = addRunner();
    const shoe = addShoe();
    const iceCream = addIceCream();
    const cursorOrb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 18, 18), cursorMaterial);
    scene.add(cursorOrb);

    const coreGeometry = new THREE.TorusKnotGeometry(1.45, 0.28, 180, 18);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xff62c8,
      emissive: 0x84145c,
      emissiveIntensity: 0.8,
      metalness: 0.72,
      roughness: 0.18
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    const wireGeometry = new THREE.IcosahedronGeometry(2.55, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x9b7cff,
      transparent: true,
      opacity: 0.24,
      wireframe: true
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    scene.add(wire);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x2cf7ff,
      transparent: true,
      opacity: 0.28
    });
    const rings = [2.1, 2.8, 3.45].map((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 8, 160), ringMaterial);
      ring.rotation.x = Math.PI / 2.4;
      ring.rotation.y = index * 0.45;
      scene.add(ring);
      return ring;
    });

    const particleCount = 420;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 9;
      positions[i3 + 1] = (Math.random() - 0.5) * 7;
      positions[i3 + 2] = (Math.random() - 0.5) * 7;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.026,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const shards = Array.from({ length: 7 }, (_, index) => {
      const geometry = new THREE.TetrahedronGeometry(0.2 + Math.random() * 0.24, 0);
      const material = new THREE.MeshStandardMaterial({
        color: index % 2 === 0 ? 0xff4fb8 : 0x2cf7ff,
        emissive: index % 2 === 0 ? 0x5b0a42 : 0x074b52,
        emissiveIntensity: 0.9,
        metalness: 0.5,
        roughness: 0.2
      });
      const shard = new THREE.Mesh(geometry, material);
      const angle = (index / 7) * Math.PI * 2;
      shard.position.set(Math.cos(angle) * 3, Math.sin(angle) * 2.1, (Math.random() - 0.5) * 2);
      scene.add(shard);
      return shard;
    });

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      if (width < 1 || height < 1) {
        return;
      }
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const handlePointerMove = (event) => {
      const bounds = mount.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1;
      const y = -(((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2 - 1);
      pointer.set(x, y);
      targetRotation.set(y * 0.26, x * 0.38);
    };

    let frameId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      core.rotation.x = elapsed * 0.28;
      core.rotation.y = elapsed * 0.5;
      wire.rotation.x = -elapsed * 0.13;
      wire.rotation.y = elapsed * 0.2;
      accentGroup.rotation.x += (targetRotation.x - accentGroup.rotation.x) * 0.045;
      accentGroup.rotation.y += (targetRotation.y - accentGroup.rotation.y) * 0.045;
      cursorOrb.position.x += (pointer.x * 2.8 - cursorOrb.position.x) * 0.12;
      cursorOrb.position.y += (pointer.y * 2.1 - cursorOrb.position.y) * 0.12;
      cursorOrb.position.z = 1.6 + Math.sin(elapsed * 5) * 0.12;
      runner.rotation.z = Math.sin(elapsed * 4) * 0.12;
      shoe.rotation.y = -0.4 + Math.sin(elapsed * 1.8) * 0.28;
      iceCream.rotation.y = elapsed * 0.5;
      particles.rotation.y = elapsed * 0.025;
      rings.forEach((ring, index) => {
        ring.rotation.z = elapsed * (0.16 + index * 0.05);
      });
      shards.forEach((shard, index) => {
        shard.rotation.x = elapsed * (0.4 + index * 0.03);
        shard.rotation.y = elapsed * (0.3 + index * 0.04);
        shard.position.y += Math.sin(elapsed * 1.5 + index) * 0.0018;
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    mount.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      ringMaterial.dispose();
      rings.forEach((ring) => ring.geometry.dispose());
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      runnerMaterial.dispose();
      shoeMaterial.dispose();
      creamMaterial.dispose();
      coneMaterial.dispose();
      cursorMaterial.dispose();
      shards.forEach((shard) => {
        shard.geometry.dispose();
        shard.material.dispose();
      });
      accentGroup.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
      });
      cursorOrb.geometry.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="hero-scene" ref={mountRef} aria-hidden="true" />;
}

export default HeroScene;
