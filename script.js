const sources = [
                 "img/R8_spyder.jpg",
                 "img/Audi_A5_coupe.jpg",
                 "img/Audi_A6_3.0_TFSI_quattro.jpg",
                 "img/Audi_A3_sedan.jpg",
                 "img/Audi_Q8.jpg",
                 "img/Audi_RS4_avant.jpg",
                 "img/Audi_RS5.jpg",
                 "img/Audi_RS5_rear_view.jpg"
                ];

const alts = [
              "Image of Audi R8 Spyder",
              "Image of Audi A5 coupe",
              "Image of Audi A6 3.0 TFSI quattro",
              "Image of Audi A3 sedan",
              "Image of Audi Q8",
              "Image of Audi RS4 avant",
              "Image of Audi RS5",
              "Rear view of Audi RS5"
             ];

const images = document.querySelectorAll(".slidePic");
const imageDiv = document.querySelector(".images");
const prevButton = document.querySelector("#prevBtn");
const nextButton = document.querySelector("#nextBtn");
const car = document.querySelector("#carName");
const currentPhoto = document.querySelector("#currentPic");
const headerElem = document.querySelector("#header");

let i = 0;
let initialX;
let sensitivity = 150;    // how much finger should travel, so that move is recognized as swipe


function setHeader(i) {
    if(i === 7) {
      car.textContent = alts[i];    
    } else {
      car.textContent = alts[i].substr(9);
    }
    currentPhoto.textContent = String(i+1);
    headerElem.style.visibility = "visible";
}

function clearHeader() {
    headerElem.style.visibility = "hidden";
}

function prevSlide() {
    clearHeader();
    images[2].setAttribute("src", sources[i]);
    images[2].setAttribute("alt", alts[i]);
    images[2].style.zIndex = "1";

    // if we are currently on the first image and want to go back, set i to 8
    if(i === 0) {
       i = 8;    
    }
    
    i--;
    images[0].setAttribute("src", sources[i]);
    images[0].setAttribute("alt", alts[i]);
    images[2].classList.add("moveRight");
    images[2].addEventListener("transitionend", function hideImg() {
        setHeader(i);
        images[2].style.zIndex = "-1";
        images[2].classList.remove("moveRight");
        images[1].setAttribute("src", sources[i]);
        images[1].setAttribute("alt", alts[i]);
        removeEventListener("transitionend", hideImg);
    });
}

function nextSlide() {
    clearHeader();
    // if we are currently on the last image and want to go further, set i to -1
    if(i === 7) {
    i = -1;    
    }

    i++;
    images[1].setAttribute("src", sources[i]);
    images[1].setAttribute("alt", alts[i]);
    images[1].classList.add("moveLeft");
    images[1].addEventListener("transitionend", function setup() {
        setHeader(i);
        images[0].setAttribute("src", sources[i]);   // setting the image below to be the same as image above
        images[0].setAttribute("alt", alts[i]);
        images[1].classList.remove("moveLeft");      // move above image to the right
        removeEventListener("transitionend", setup);
    });
}

function startTouch(e) {
  initialX = e.touches[0].clientX;
}

function moveTouch(e) {
  if (initialX === null) {
    return;
  }
  
  let currentX = e.touches[0].clientX;
  let diffX = initialX - currentX;

  if(Math.abs(diffX) >= sensitivity) {
    if (diffX > 0) {
      // swiped left
      nextSlide();
    } else {
      // swiped right
      prevSlide();
    }  
  } else {
    return;
  }
    
  initialX = null;
  e.preventDefault();
}


prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);
imageDiv.addEventListener("touchstart", startTouch);
imageDiv.addEventListener("touchmove", moveTouch);