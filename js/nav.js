const nav_button = document.getElementById('nav-btn');
const nav_menu = document.getElementById('nav-menu');

let navIsOpen = false;

nav_button.addEventListener("click", function(){
    if (navIsOpen) {
        nav_button.style.animation = "slideBtnRight 0.175s linear 0s normal forwards";
        nav_menu.classList.add("open-menu");
        nav_menu.style.animation = "slideNavRight 0.175s linear 0s normal forwards";
        console.log('you clicked homie');
        navIsOpen = false;
    }else{
        nav_button.style.animation = "slideBtnLeft 0.35s ease 0s normal forwards";
        nav_menu.classList.add("open-menu");
        nav_menu.style.animation = "slideNavLeft 0.35s ease 0s normal forwards";
        console.log('you clicked homie');
        navIsOpen = true;
    }
});

nav_menu.addEventListener("animationend", function(){
    if (!navIsOpen) {
        nav_menu.style.animation = ""
        nav_button.style.animation = ""
        nav_menu.classList.remove("open-menu");
    }
});

window.onresize = function() {
    if (window.innerWidth < 1365){
        navIsOpen = false;
        nav_menu.classList.remove("open-menu");
        nav_menu.style.animation = ""
        nav_button.style.animation = "";
    }else{
        navIsOpen = false;
        nav_menu.classList.remove("open-menu");
        nav_menu.style.animation = ""
        nav_button.style.animation = "";
    }
}