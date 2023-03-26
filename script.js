var nightMode = false;

var buttons = document.getElementsByClassName("button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () { PressedButton(buttons[i]) };
}

document.querySelectorAll(`.therapies-card button`).forEach(item => {
    item.onclick = () => therapopup(item);
});

document.querySelectorAll(`#nav-buttons li`).forEach(item => {
    item.onclick = () => DropDown(item);
});

therapopupClose();

var therapiesImgs = document.getElementsByClassName("therapies-img");
for (let i = 0; i < therapiesImgs.length; i++) {
    therapiesImgs[i].style.backgroundImage = `url("images/therapiesImg/therapicon${i}.jpg")`;
}

galleryImport();

function PressedButton(button) {
    let transition = button.style.transition;
    button.style.transition = "transform ease-out 0.05s";
    button.style.transform += ` scale(0.8)`;
        
    setTimeout(() => {
        button.style.transform = button.style.transform.slice(0, -11);
        button.style.transition = "transform 0.2s ease-out 0s";
    }, 50);
    setTimeout(() => {
        button.style.transition = transition;
    }, 100);
}

function NightMode(button) {
    nightMode = nightMode ? false : true;
    
    modeIconAnimation(nightMode, button);
    
    if (nightMode) {
        let toToggle = document.querySelectorAll(".daytime");
        for (let i = 0; i < toToggle.length; i++) {
            toToggle[i].classList.replace("daytime", "nighttime");
        }
    } else {
        let toToggle = document.querySelectorAll(".nighttime");
        for (let i = 0; i < toToggle.length; i++) {
            toToggle[i].classList.replace("nighttime", "daytime");
        }
    }
}

function modeIconAnimation(mode, button) {
    button.style.transition = "all 0s";
    button.style.animation = "nightModeStart 0.1s ease-in 0s 1 normal both";
    setTimeout(() => {
        button.style.backgroundImage = `url("images/${mode ? "noon" : "night"}.png")`;
        button.style.animation = "nightModeEnd 0.1s ease-out 0s 1 normal both";
    }, 100);
    setTimeout(() => {
        button.style.animation = "";
    }, 200);
}

function therapopup(button) {
    PressedButton(button);
    if (button.parentElement.classList[0] == "therapies-text") {
        document.querySelectorAll(`.popup-body`)[0].innerHTML = `<div class="text"></div>
                                                                 <div class="img"></div>`;
        document.querySelectorAll(`.popup-body .text`)[0].innerHTML = therapopupText(button.parentElement.children[0].innerHTML);
        document.querySelectorAll(`.popup-header .title`)[0].innerHTML = button.parentElement.children[0].innerHTML;
        document.querySelectorAll(`.popup-body .img`)[0].style.backgroundImage = `url("images/therapiesImg/therapicon${therapopupImage(button.parentElement.children[0].innerHTML)}.jpg")`;
    }
    document.getElementById("popup").classList.replace("unclicked", "clicked");
    document.getElementById("popup-overlay").classList.replace("unclicked", "clicked");
}

function therapopupClose() {
    let close = document.querySelectorAll(`#popup .close-button`)[0];
    close.addEventListener("click", () => {
        PressedButton(close);
        document.getElementById("popup-overlay").classList.replace("clicked", "unclicked");
        document.getElementById("popup").classList.replace("clicked", "unclicked");
        setTimeout(() => {
            document.querySelectorAll(`.popup-body`)[0].innerHTML = "";
        }, 300);
    });
    close.addEventListener("mouseover", () => {
        close.style.transform = "rotateZ(90deg)";
    });
    close.addEventListener("mouseleave", () => {
        close.style.transform = "rotateZ(0deg)";
    });
}

function galleryImport() {
    let whereimg = document.getElementsByClassName("gallery-imgs")[0];
    for (let i = 0; i < 25; i++) {
        whereimg.appendChild(document.createElement("div"));
        whereimg.children[i].classList.add("gallery-img");
        whereimg.children[i].style.backgroundImage = `
        url('images/galeria/toScroll/toscroll${i < 21 ? i : i - 21}.jpg')`;
    }

    let galleryDivs = document.getElementsByClassName("gallery-img");
    for (let i = 0; i < galleryDivs.length; i++) {
        galleryDivs[i].addEventListener("mousedown", 
        () => document.querySelectorAll(".gallery-imgs")[0].style.animationPlayState = "paused");
        galleryDivs[i].addEventListener("mouseup", 
        () => document.querySelectorAll(".gallery-imgs")[0].style.animationPlayState = "running");
    }
}

var dropdownClicked = false;

function DropDown(button) {
    PressedButton(button);
    dropdownClicked = dropdownClicked ? false : true;

    let ul = document.querySelectorAll("#nav-buttons ul")[0];
    if (dropdownClicked) {
        ul.style.animation = "dropdown 0.2s ease-in-out 0s 1 normal both";
    } else {
        ul.style.animation = "dropdown 0.2s ease-in-out 0s 1 reverse both";
    }
    setTimeout(() => {
        ul.style.animation = "";
        ul.style.top = dropdownClicked ? "19vw" : "-100vw";
    }, 200);
}