// import { gsap } from "gsap";

// import { ScrollTrigger } from "gsap/ScrollTrigger";

const createSwiper = () => {
  return new Swiper(".mySwiper", {
    cssMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
  });
};

createSwiper();

// const createAnimation = () => {
//   gsap.registerPlugin(ScrollTrigger);
//   const tlHero = gsap.timeline();

//   tlHero
//     .from(
//       ".hero__description",
//       {
//         opacity: 0,
//         x: -500,
//         duration: 2,
//         ease: "expo",
//       },
//       "0.3"
//     )
//     .from(
//       ".header__contacts-wrap",
//       {
//         opacity: 0,
//         y: 200,
//         duration: 2,
//         ease: "expo",
//       },
//       "-=2"
//     )
//     .from(
//       ".hero__form",
//       { opacity: 0, x: 500, duration: 2, ease: "expo" },
//       "-=2"
//     )
//     .from(
//       ".header__nav",
//       {
//         opacity: 0,
//         x: 200,
//         duration: 2,
//         ease: "expo",
//       },
//       "-=1.3"
//     )
//     .from(
//       ".header__logo-wrap",
//       {
//         opacity: 0,
//         x: -200,
//         duration: 2,
//         ease: "expo",
//       },
//       "-=2"
//     );

//   const tlServices = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".services",
//       start: "top center",
//     },
//   });

//   tlServices
//     .from(".services__card-wrap", {
//       opacity: 0,
//       x: -500,
//       duration: 2,
//       ease: "expo",
//     })
//     .from(
//       ".services__description",
//       {
//         opacity: 0,
//         x: 500,
//         duration: 2,
//         ease: "expo",
//       },
//       "-=2"
//     );
// };

// createAnimation();
