const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = index => (
  `frames/frame_${index.toString().padStart(6, '0')}.jpg`
)

const images = [];

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images[i] = img;
  }
};

preloadImages();

canvas.width = 1920;
canvas.height = 1080;

images[1].onload = function () {
  context.drawImage(images[1], 0, 0);
}

const updateImage = index => {
  if (images[index] && images[index].complete) {
    context.drawImage(images[index], 0, 0);
  } else if (images[index]) {
    images[index].onload = () => {
      context.drawImage(images[index], 0, 0);
    }
  }
}

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1))
});
