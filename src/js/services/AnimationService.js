export default class AnimationService {
  animate(ele, name) {
    const animationClass = `animate-${name}`;

    ele.classList.add(animationClass);
    ele.addEventListener("animationend", e => {
      e.target.classList.remove(animationClass);
    });
  }

  pop(ele) {
    this.animate(ele, "pop");
  }
};