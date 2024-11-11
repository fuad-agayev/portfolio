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


//  -------------------- dark and light mode --------------------------
const clickDarkMode = () => {
  if(body.getAttribute("data-mode") === 'light'){
    body.setAttribute("data-mode", 'dark');
  } else {
    body.setAttribute("data-mode", 'light');
  }
}

mode_icon.addEventListener("click", clickDarkMode);
//  -------------------- dark and light mode --------------------------

//  -------------------------- menu  ----------------------------------

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
//  --------------------------------- menu  -----------------------------














