ScrollDecision();
window.addEventListener("resize", () => ScrollDecision());

function ScrollDecision() {
    var nav = document.getElementsByTagName("nav")[0];

    if (screen.orientation.type.substring(0, 8) != "portrait") {

        document.body.classList.remove("phone");
    
        window.onscroll = () => {
            if (document.documentElement.scrollTop > nav.offsetHeight * 0.6) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        }
    } else {
        window.onscroll = () => {};
        document.body.classList.add("phone");
        nav.classList.remove("scrolled");
    }
}

   // alert(screen.orientation.type);




