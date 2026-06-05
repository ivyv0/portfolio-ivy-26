/* =========================
   MENU OVERLAY
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const menuOverlay = document.querySelector(".menu-overlay");
const menuLinks = document.querySelectorAll(".menu-overlay a");

if(menuToggle && menuClose && menuOverlay){

  menuToggle.addEventListener("click", () => {
    menuOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });

  menuClose.addEventListener("click", () => {
    menuOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuOverlay.classList.remove("is-open");
      document.body.style.overflow = "";
    });
  });

}


/* =========================
   PAGE LOADER
========================= */

const pageLoader = document.getElementById("pageLoader");

window.addEventListener("load", () => {
  if(pageLoader){
    setTimeout(() => {
      pageLoader.classList.add("is-hidden");
    }, 600);
  }
});

/* extra safety: loader gaat sowieso weg */
setTimeout(() => {
  if(pageLoader){
    pageLoader.classList.add("is-hidden");
  }
}, 3000);


/* =========================
   LANDING VIDEO AUTOPLAY / FALLBACK
========================= */

const heroVideo = document.getElementById("landingVideo");
const heroVideoFallback = document.getElementById("landingVideoFallback");

if(heroVideo){

  heroVideo.muted = true;
  heroVideo.playsInline = true;

  const showVideoFallback = () => {
    heroVideo.classList.add("video-failed");

    if(heroVideoFallback){
      heroVideoFallback.classList.add("is-visible");
    }
  };

  const tryPlayLandingVideo = async () => {
    try{
      await heroVideo.play();
    }catch(error){
      showVideoFallback();
    }
  };

  window.addEventListener("load", () => {
    tryPlayLandingVideo();

    setTimeout(() => {
      if(heroVideo.paused || heroVideo.readyState < 2){
        tryPlayLandingVideo();
      }
    }, 800);

    setTimeout(() => {
      if(heroVideo.paused || heroVideo.readyState < 2){
        showVideoFallback();
      }
    }, 2200);
  });

  document.addEventListener(
    "touchstart",
    () => {
      if(heroVideo.paused){
        tryPlayLandingVideo();
      }
    },
    { once:true }
  );

  document.addEventListener(
    "click",
    () => {
      if(heroVideo.paused){
        tryPlayLandingVideo();
      }
    },
    { once:true }
  );

  heroVideo.addEventListener("stalled", showVideoFallback);
  heroVideo.addEventListener("error", showVideoFallback);

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal-section, .reveal-card");

if(revealElements.length > 0){

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold:0.12,
      rootMargin:"0px 0px -8% 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

}


/* =========================
   LANDING VIDEO PARALLAX
========================= */

const landing = document.querySelector(".landing");

if(landing && heroVideo){

  window.addEventListener("scroll", () => {
    const rect = landing.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);

    heroVideo.style.transform = `
      translate(-50%, -50%)
      translateY(${progress * 2.5}rem)
      scale(${1 - progress * 0.04})
    `;
  });

}