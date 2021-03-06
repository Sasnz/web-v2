// JS for making the cart and menu hide and appear on click

// Cart controls
document.querySelector(".cart").addEventListener("click", (event) => {
    document.querySelector(".cartPopup").classList.toggle("open");
})
document.querySelector(".cartClose").addEventListener("click", (event) => {
    document.querySelector(".cartPopup").classList.toggle("open");
})

// Menu controls (menu differs from cart as it is a toggle)
// Has function to swap the word "menu" to "close", makes the word "cart" vanish and 
// colours the words white for readability.
document.querySelector(".menu").addEventListener("click", (event) => {
    document.querySelector(".menuPopup").classList.toggle("open");
    if(document.querySelector(".menuPopup").classList.contains("open")){
        document.querySelector(".menu").innerHTML="Close";
        document.querySelector(".menu").classList.toggle("activeMenu");

        document.querySelector(".title").classList.toggle("activeMenu");
        document.querySelector(".subTitle").classList.toggle("activeMenu");

        document.querySelector(".cart").innerHTML="  ";
    }else{
        document.querySelector(".menu").innerHTML="Menu";
        document.querySelector(".menu").classList.toggle("activeMenu");
        document.querySelector(".title").classList.toggle("activeMenu");
        document.querySelector(".subTitle").classList.toggle("activeMenu");
        document.querySelector(".cart").innerHTML="Cart";
    }
})

document.addEventListener('DOMContentLoaded', () => {
    let mousePosX = 0,
        mousePosY = 0,
        mouseCircle = document.querySelector('#mouse-circle');

    document.onmousemove = (e) => {
        mousePosX = e.pageX;
        mousePosY = e.pageY;
    }

    let delay = 6,
        revisedMousePosX = 0,
        revisedMousePosY = 0;

    function delayMouseFollow() {
        requestAnimationFrame(delayMouseFollow);
        revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
        revisedMousePosY += (mousePosY - revisedMousePosY) / delay; 

        mouseCircle.style.top = revisedMousePosY + 'px';
        mouseCircle.style.left = revisedMousePosX + 'px';
    }
    delayMouseFollow();
});

// <-- Mouse Circle -->
mouseCircle = document.querySelector('#mouse-circle');
let links = document.querySelectorAll(".hover");
links.forEach(link =>{
    link.addEventListener("mouseover", event =>{
        mouseCircle.style.backdropFilter = "invert(100%)";
        mouseCircle.style.transform = "scale(1.5)";
    })

})

links.forEach(link =>{
    link.addEventListener("mouseout", event =>{
        mouseCircle.style.backdropFilter = "invert(0%)";
        mouseCircle.style.transform = "scale(1.0)";

    })

})

// <-- API -->
/* The API fetches a series of images from unsplash.com. the query is for "bbq",
these images are then displayed in the side scrolling bar*/
fetch('https://api.unsplash.com/search/photos?client_id=OrrzZqBn3r88laW2SdFxIes6Q8aAxa76qT__CdZuThE&query=bbq')
.then(res => {
    return res.json();
})
.then(data => {
    let scrollDiv = document.querySelector(".SideScroll");
    data.results.forEach(RecipeIMG => {
        //make a div first
        let img = document.createElement("img");
        img.src = RecipeIMG.urls.regular;

        img.classList.add("ScrollImg");

        //div append img
        //scrolldiv append div
        scrollDiv.append(img);
    });
});

//<-- horizontal scrolling -->
(function HorizontalScrolling () {
    function wheelHandler (element, event) {
        const toLeft = event.deltaY < 0 && element.scrollLeft > 0
        const toRight = event.deltaY > 0 && element.scrollLeft < element.scrollWidth - element.clientWidth
         if (toLeft || toRight) {
            event.preventDefault()
            event.stopPropagation()
    element.scrollBy({ left: event.deltaY })
    }
}
const targets = document.querySelectorAll('.SideScroll')
 targets.forEach(element => element.addEventListener('wheel', event => wheelHandler(element, event)))
})()

//<-- Makes the scroll "grabbable" -->
const slider = document.querySelector('.SideScroll');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
    isDown = false;  
    slider.classList.remove('.active');  
  });
    slider.addEventListener('mouseup', () => {  
    isDown = false;  
    slider.classList.remove('.active');  
  });
  
  slider.addEventListener('mousemove', (e) => {  
    if(!isDown) return;  
    e.preventDefault();  
    const x = e.pageX - slider.offsetLeft;  
    const walk = (x - startX) * 1; //scroll-speed  
    slider.scrollLeft = scrollLeft - walk;  
    console.log(walk);  
  });
