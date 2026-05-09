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
    camera.position.set(0, 0.35, 7.4);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const pointer = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Vector2(0, 0);
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    const tracked = [];
    const remember = (item) => {
      tracked.push(item);
      return item;
    };

    const material = (options) => remember(new THREE.MeshStandardMaterial(options));
    const basic = (options) => remember(new THREE.MeshBasicMaterial(options));

    const wallMaterial = material({
      color: 0x111426,
      emissive: 0x070a16,
      emissiveIntensity: 0.45,
      metalness: 0.1,
      roughness: 0.82
    });
    const floorMaterial = material({
      color: 0x161728,
      emissive: 0x080912,
      emissiveIntensity: 0.35,
      metalness: 0.22,
      roughness: 0.54
    });
    const deskMaterial = material({
      color: 0x232235,
      emissive: 0x0a0a16,
      emissiveIntensity: 0.35,
      metalness: 0.38,
      roughness: 0.32
    });
    const blackMaterial = material({
      color: 0x050711,
      emissive: 0x02030a,
      emissiveIntensity: 0.5,
      metalness: 0.48,
      roughness: 0.2
    });
    const cyanMaterial = material({
      color: 0x2cf7ff,
      emissive: 0x2cf7ff,
      emissiveIntensity: 1.8,
      metalness: 0.24,
      roughness: 0.18
    });
    const pinkMaterial = material({
      color: 0xff4fb8,
      emissive: 0xff4fb8,
      emissiveIntensity: 1.65,
      metalness: 0.18,
      roughness: 0.18
    });
    const violetMaterial = material({
      color: 0x9b7cff,
      emissive: 0x9b7cff,
      emissiveIntensity: 1.55,
      metalness: 0.18,
      roughness: 0.2
    });
    const screenMaterial = material({
      color: 0x06131e,
      emissive: 0x031d2b,
      emissiveIntensity: 1.1,
      metalness: 0.15,
      roughness: 0.26
    });
    const medalMaterial = material({
      color: 0xf7c85f,
      emissive: 0x8a5d10,
      emissiveIntensity: 0.55,
      metalness: 0.7,
      roughness: 0.22
    });
    const glassMaterial = material({
      color: 0x0b2130,
      emissive: 0x083349,
      emissiveIntensity: 0.9,
      metalness: 0.05,
      roughness: 0.12,
      transparent: true,
      opacity: 0.5
    });
    const steamMaterial = basic({
      color: 0xeefcff,
      transparent: true,
      opacity: 0.44,
      depthWrite: false
    });
    const rainMaterial = basic({
      color: 0x7defff,
      transparent: true,
      opacity: 0.48
    });

    scene.add(new THREE.AmbientLight(0x6d7dff, 0.55));

    const cyanLight = new THREE.PointLight(0x2cf7ff, 4.2, 16);
    cyanLight.position.set(-2.9, 2.4, 3.2);
    scene.add(cyanLight);

    const pinkLight = new THREE.PointLight(0xff4fb8, 4.8, 16);
    pinkLight.position.set(3.1, 1.5, 3.4);
    scene.add(pinkLight);

    const violetLight = new THREE.PointLight(0x9b7cff, 2.5, 14);
    violetLight.position.set(0, -1.8, 4.6);
    scene.add(violetLight);

    const addBox = (size, position, mat, rotation = [0, 0, 0]) => {
      const mesh = new THREE.Mesh(remember(new THREE.BoxGeometry(...size)), mat);
      mesh.position.set(...position);
      mesh.rotation.set(...rotation);
      roomGroup.add(mesh);
      return mesh;
    };

    addBox([6.5, 3.6, 0.08], [0, 0.8, -1.95], wallMaterial);
    addBox([6.5, 0.08, 3.7], [0, -1.08, -0.12], floorMaterial);
    addBox([0.08, 3.6, 3.7], [-3.24, 0.8, -0.1], wallMaterial);
    addBox([0.08, 3.6, 3.7], [3.24, 0.8, -0.1], wallMaterial);

    const desk = addBox([4.4, 0.18, 1.18], [0, -0.42, 0.05], deskMaterial);
    addBox([0.18, 1.1, 0.18], [-1.9, -1.0, 0.42], deskMaterial);
    addBox([0.18, 1.1, 0.18], [1.9, -1.0, 0.42], deskMaterial);
    addBox([4.5, 0.05, 0.08], [0, -0.28, 0.68], cyanMaterial);
    addBox([0.08, 2.45, 0.08], [-3.04, 0.52, 0.65], pinkMaterial);
    addBox([0.08, 2.45, 0.08], [3.04, 0.52, 0.65], cyanMaterial);

    const windowGroup = new THREE.Group();
    windowGroup.position.set(0, 0.95, -1.88);
    roomGroup.add(windowGroup);
    const windowPane = new THREE.Mesh(remember(new THREE.BoxGeometry(2.38, 1.52, 0.035)), glassMaterial);
    windowGroup.add(windowPane);
    const framePieces = [
      [[2.55, 0.06, 0.08], [0, 0.78, 0.03]],
      [[2.55, 0.06, 0.08], [0, -0.78, 0.03]],
      [[0.06, 1.6, 0.08], [-1.27, 0, 0.03]],
      [[0.06, 1.6, 0.08], [1.27, 0, 0.03]],
      [[0.05, 1.5, 0.08], [0, 0, 0.04]]
    ];
    framePieces.forEach(([size, position]) => {
      const frame = new THREE.Mesh(remember(new THREE.BoxGeometry(...size)), blackMaterial);
      frame.position.set(...position);
      windowGroup.add(frame);
    });

    const rainDrops = Array.from({ length: 42 }, () => {
      const drop = new THREE.Mesh(remember(new THREE.BoxGeometry(0.012, 0.28, 0.012)), rainMaterial);
      drop.position.set((Math.random() - 0.5) * 2.15, (Math.random() - 0.5) * 1.35, 0.08);
      drop.rotation.z = -0.18;
      windowGroup.add(drop);
      return drop;
    });

    const makeScreen = (x, y, z, width, height, rotationY, glowMaterial) => {
      const group = new THREE.Group();
      group.position.set(x, y, z);
      group.rotation.y = rotationY;
      roomGroup.add(group);

      const panel = new THREE.Mesh(remember(new THREE.BoxGeometry(width, height, 0.08)), screenMaterial);
      group.add(panel);

      const rim = new THREE.Mesh(remember(new THREE.BoxGeometry(width + 0.08, height + 0.08, 0.035)), blackMaterial);
      rim.position.z = -0.04;
      group.add(rim);

      const lines = Array.from({ length: 8 }, (_, index) => {
        const lineWidth = width * (0.38 + Math.random() * 0.38);
        const line = new THREE.Mesh(remember(new THREE.BoxGeometry(lineWidth, 0.018, 0.025)), index % 3 === 0 ? pinkMaterial : glowMaterial);
        line.position.set(-width * 0.18 + Math.random() * width * 0.25, height * 0.28 - index * height * 0.075, 0.065);
        group.add(line);
        return line;
      });

      return { group, lines };
    };

    const screens = [
      makeScreen(-1.25, 0.42, 0.16, 1.35, 0.9, 0.22, cyanMaterial),
      makeScreen(0.22, 0.52, 0.02, 1.6, 1.02, 0, violetMaterial),
      makeScreen(1.72, 0.38, 0.14, 1.18, 0.82, -0.28, cyanMaterial),
      makeScreen(0.2, -0.02, 0.42, 0.85, 0.48, -0.02, pinkMaterial)
    ];

    const keyboard = new THREE.Group();
    keyboard.position.set(-0.35, -0.25, 0.66);
    roomGroup.add(keyboard);
    const keyMaterial = material({
      color: 0x0d1320,
      emissive: 0x0b4e67,
      emissiveIntensity: 0.7,
      metalness: 0.25,
      roughness: 0.4
    });
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 9; col += 1) {
        const key = new THREE.Mesh(remember(new THREE.BoxGeometry(0.12, 0.025, 0.08)), keyMaterial);
        key.position.set(col * 0.15, 0, row * 0.11);
        keyboard.add(key);
      }
    }
    keyboard.rotation.x = -0.08;

    const mug = new THREE.Group();
    mug.position.set(1.7, -0.15, 0.62);
    roomGroup.add(mug);
    const mugBody = new THREE.Mesh(remember(new THREE.CylinderGeometry(0.17, 0.18, 0.34, 28, 1, true)), material({
      color: 0x111827,
      emissive: 0xff4fb8,
      emissiveIntensity: 0.55,
      metalness: 0.35,
      roughness: 0.24
    }));
    mug.add(mugBody);
    const handle = new THREE.Mesh(remember(new THREE.TorusGeometry(0.15, 0.026, 8, 30)), cyanMaterial);
    handle.position.set(0.18, 0.02, 0);
    handle.rotation.y = Math.PI / 2;
    mug.add(handle);
    const steam = Array.from({ length: 7 }, (_, index) => {
      const puff = new THREE.Mesh(remember(new THREE.SphereGeometry(0.035 + index * 0.003, 12, 12)), steamMaterial);
      puff.position.set((Math.random() - 0.5) * 0.16, 0.22 + index * 0.08, (Math.random() - 0.5) * 0.08);
      mug.add(puff);
      return puff;
    });

    const shoes = new THREE.Group();
    shoes.position.set(-1.85, -0.98, 0.9);
    shoes.rotation.set(0.08, -0.45, -0.04);
    roomGroup.add(shoes);
    const makeShoe = (x, z, accent) => {
      const shoe = new THREE.Group();
      shoe.position.set(x, 0, z);
      const sole = new THREE.Mesh(remember(new THREE.BoxGeometry(0.72, 0.12, 0.24)), blackMaterial);
      sole.position.y = -0.03;
      shoe.add(sole);
      const upper = new THREE.Mesh(remember(new THREE.BoxGeometry(0.48, 0.22, 0.25)), accent);
      upper.position.set(-0.06, 0.09, 0);
      upper.rotation.z = -0.13;
      shoe.add(upper);
      const toe = new THREE.Mesh(remember(new THREE.SphereGeometry(0.15, 18, 18)), accent);
      toe.scale.set(1.45, 0.6, 0.74);
      toe.position.set(0.33, 0.02, 0);
      shoe.add(toe);
      shoes.add(shoe);
      return shoe;
    };
    const leftShoe = makeShoe(-0.2, 0.02, cyanMaterial);
    const rightShoe = makeShoe(0.18, -0.18, pinkMaterial);
    rightShoe.rotation.y = 0.18;

    const medals = new THREE.Group();
    medals.position.set(2.45, 0.92, -1.82);
    roomGroup.add(medals);
    const medalMeshes = Array.from({ length: 3 }, (_, index) => {
      const ribbon = new THREE.Mesh(remember(new THREE.BoxGeometry(0.05, 0.72, 0.025)), index % 2 === 0 ? pinkMaterial : cyanMaterial);
      ribbon.position.set(index * 0.28, 0.02, 0.07);
      ribbon.rotation.z = index === 1 ? 0 : index === 0 ? 0.18 : -0.18;
      medals.add(ribbon);

      const medal = new THREE.Mesh(remember(new THREE.CylinderGeometry(0.115, 0.115, 0.035, 32)), medalMaterial);
      medal.position.set(index * 0.28, -0.38, 0.1);
      medal.rotation.x = Math.PI / 2;
      medals.add(medal);
      return medal;
    });

    const particleCount = 520;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 6.5;
      positions[i3 + 1] = (Math.random() - 0.5) * 3.8;
      positions[i3 + 2] = (Math.random() - 0.5) * 3.4 + 0.35;
    }
    const particlesGeometry = remember(new THREE.BufferGeometry());
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = remember(new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
      transparent: true,
      opacity: 0.78,
      depthWrite: false
    }));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    roomGroup.add(particles);

    const cursorOrb = new THREE.Mesh(
      remember(new THREE.SphereGeometry(0.065, 18, 18)),
      basic({ color: 0xffffff, transparent: true, opacity: 0.86 })
    );
    scene.add(cursorOrb);

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
      targetRotation.set(y * 0.12, x * 0.18);
    };

    let frameId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      roomGroup.rotation.x += (targetRotation.x - roomGroup.rotation.x) * 0.04;
      roomGroup.rotation.y += (targetRotation.y - roomGroup.rotation.y) * 0.04;
      desk.position.y = -0.42 + Math.sin(elapsed * 1.1) * 0.01;

      screens.forEach((screen, screenIndex) => {
        screen.group.position.y += Math.sin(elapsed * 1.5 + screenIndex) * 0.0009;
        screen.lines.forEach((line, lineIndex) => {
          line.scale.x = 0.62 + Math.abs(Math.sin(elapsed * 2.4 + lineIndex + screenIndex)) * 0.48;
          line.material.emissiveIntensity = 1.05 + Math.sin(elapsed * 3.2 + lineIndex) * 0.35;
        });
      });

      rainDrops.forEach((drop, index) => {
        drop.position.y -= 0.018 + (index % 5) * 0.003;
        drop.position.x += Math.sin(elapsed * 2 + index) * 0.0008;
        if (drop.position.y < -0.78) {
          drop.position.y = 0.78;
        }
      });

      steam.forEach((puff, index) => {
        puff.position.y += 0.004 + index * 0.0004;
        puff.position.x += Math.sin(elapsed * 1.8 + index) * 0.0016;
        puff.scale.setScalar(0.78 + Math.sin(elapsed * 2.2 + index) * 0.18 + index * 0.05);
        if (puff.position.y > 0.95) {
          puff.position.y = 0.24;
        }
      });

      leftShoe.rotation.y = Math.sin(elapsed * 1.2) * 0.08;
      rightShoe.rotation.y = 0.18 + Math.sin(elapsed * 1.35 + 0.7) * 0.08;
      medalMeshes.forEach((medal, index) => {
        medal.rotation.z = Math.sin(elapsed * 1.6 + index) * 0.16;
      });

      particles.rotation.y = elapsed * 0.025;
      particles.position.y = Math.sin(elapsed * 0.9) * 0.035;
      cyanLight.intensity = 3.8 + Math.sin(elapsed * 1.9) * 0.45;
      pinkLight.intensity = 4.4 + Math.sin(elapsed * 1.6 + 1) * 0.5;
      violetLight.intensity = 2.3 + Math.sin(elapsed * 1.4 + 2) * 0.25;

      cursorOrb.position.x += (pointer.x * 2.7 - cursorOrb.position.x) * 0.12;
      cursorOrb.position.y += (pointer.y * 2 - cursorOrb.position.y) * 0.12;
      cursorOrb.position.z = 1.8 + Math.sin(elapsed * 5) * 0.12;

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
      tracked.forEach((item) => item.dispose?.());
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="hero-scene" ref={mountRef} aria-hidden="true" />;
}

export default HeroScene;
