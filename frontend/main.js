const body = document.querySelector("body");
const mode_icon = document.querySelector(".mode i");
const slide = document.querySelector(".slide ul");
const slider = document.querySelector(".slide");
const top_line = document.querySelector(".top-line");
const bottom_line = document.querySelector(".bottom-line");
const menu_line = document.querySelector(".menu-line");
const menu_icon = document.querySelector(".menu-icon");
const input_checking = document.querySelector(".input-checking");
const horizontal = document.querySelector(".horizontal");


//!  -------------------- dark and light mode --------------------------
const clickDarkMode = () => {
  if(body.getAttribute("data-mode") === 'light'){
    body.setAttribute("data-mode", 'dark');
  } else {
    body.setAttribute("data-mode", 'light');
  }
}

mode_icon.addEventListener("click", clickDarkMode);
//!  -------------------- dark and light mode --------------------------

//!  -------------------------- menu  ----------------------------------

const menuToggle = () => {
  // Menü görüntüleme durumunu kontrol ediyoruz
  if (slide.style.display === "none" || slide.style.display === "") {
    slide.style.display = "block";


    // X şeklini almak için üst ve alt çizgileri konumlandırıyoruz
    const lines = [
      { element: top_line, top: "12px", left: "7px", transform: "rotate(40deg)" },
      { element: bottom_line, top: "12px", left: "7px", transform: "rotate(-40deg)" }
    ];

    lines.forEach(({ element, top, left, transform }) => {
      element.style.top = top;
      element.style.left = left;
      element.style.transform = transform;
    });
  } else {
    // Menü kapandığında çizgileri normal pozisyonlarına geri alıyoruz
    slide.style.display = "none";
    ["top", "bottom"].forEach(line => {
      const el = document.querySelector(`.${line}-line`);
      el.style.top = line === "top" ? "38%" : "65%";
      el.style.left = "50%";
      el.style.transform = "translate(-50%, -50%)";
    });
  }
};

// Menü simgesine tıklandığında `menuToggle` işlevini çağırıyoruz
menu_line.addEventListener("click", menuToggle);

// Menü bağlantılarına tıklandığında menüyü kapatıyoruz
slide.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    slider.style.display = "none";
    horizontal.style.display ="none";
    // Menü çizgilerini eski pozisyonuna döndürüyoruz
    ["top", "bottom"].forEach(line => {
      const el = document.querySelector(`.${line}-line`);
      el.style.top = line === "top" ? "38%" : "65%";
      el.style.left = "50%";
      el.style.transform = "translate(-50%, -50%)";
    });
  } 
  
});

input_checking.addEventListener("click", () => {
    if(input_checking.checked){
      slider.style.display = "block";
      slider.style.transition = "transform 0.5s ease";
      slide.style.display = "block";
      slider.style.transform = "translateX(100%)"
      horizontal.style.display ="block";
    }else {
      slider.style.transition = "transform 1s ease";
      slider.style.transform = "translateX(-100%)";
      horizontal.style.display ="none";
    }
})
//!  -------------------------- menu  ----------------------------------


//!  ---------------------   active scroll link  ----------------------------

const sections = document.querySelectorAll("section");
const navigation_link = document.querySelectorAll(".navigation-link");

function setActive(){
  let currentPosition = window.scrollY;

  sections.forEach((section, index) => {
    const sectioTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if(currentPosition >= sectioTop - 50 && currentPosition < sectioTop + sectionHeight) {
      navigation_link.forEach((nav_link) => nav_link.classList.remove("active"));
      navigation_link[index].classList.add("active");
    }
  })
}
window.addEventListener("scroll", setActive);
//!  ---------------------   active scroll link  ----------------------------

//!  ---------------------  responsive active link  ----------------------------
const responsive_link = document.querySelectorAll(".responsive-link");

responsive_link.forEach((res_link, index) => {
  res_link.addEventListener("click", () => {
            responsive_link.forEach((res_link) => res_link.classList.remove("active"));
            res_link.classList.add("active");
  })
})
//!  ---------------------  responsive active link  ----------------------------


//!  ---------------------  Typining   ----------------------------

const div = document.getElementById("typining");
const text = "Frontend_Developer";

function textWritter(el, txt, i = 0){
  if(i === 0){
          el.textContent = "";
        }
     el.textContent += txt[i];
     if(i === txt.length - 1){
          return;
     }
      setTimeout(() => textWritter(el, txt, i + 1), 150)
}
textWritter(div, text);
//!  ---------------------  Typining   ----------------------------


//!  ---------------------  Form send to email   ----------------------------
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const response = await fetch('../backend/load', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
  });

  const text = await response.text();
  alert(text.message)
  
});
//!  ---------------------  Form send to email   ----------------------------



