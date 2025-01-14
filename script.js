let lastScrollY = 0;

document.addEventListener("scroll", () => {
  const scene1 = document.getElementById("scene1");
  const shapes = scene1.querySelectorAll(".shape");
  const rect = scene1.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom > 0;

  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;
  lastScrollY = currentScrollY;

  if (isInView) {
    shapes.forEach((shape, idx) => {
      const angle = (idx / shapes.length) * 360;
      const distance = scrollingDown ? 200 : 0;
      const x = distance * Math.cos((angle * Math.PI) / 180);
      const y = distance * Math.sin((angle * Math.PI) / 180);

      shape.style.opacity = scrollingDown ? "1" : "0";
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
});

const scenes = document.querySelectorAll(".scene");
const totalScenes = scenes.length;

function updateScenes() {
    const scrollPosition = window.scrollY;
    const sceneIndex = Math.min(
        Math.floor((scrollPosition / window.innerHeight) * totalScenes),
        totalScenes - 1
    );

    scenes.forEach((scene, index) => {
        if (index === sceneIndex) {
            scene.classList.add("active");
            scene.classList.remove("inactive");
        } else {
            scene.classList.add("inactive");
            scene.classList.remove("active");
        }
    });
}

document.addEventListener("scroll", updateScenes);

// Initialize the first scene
updateScenes();
