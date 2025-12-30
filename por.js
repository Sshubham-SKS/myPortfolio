// toggle icon navbar
let menuIcon= document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () =>{
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset= sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height){
            // active navbar links
            navLinks.forEach(link=>{
                // links.classList.remove('active');
                link.classList.remove('active');

                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
        }
    });

    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

/* ===================== */
/* 3D SKILLS ANIMATION */
/* ===================== */

const ring = document.getElementById("ring");
const tiles = document.querySelectorAll(".skill-tile");
const area = document.querySelector(".skill-area");

let spinY = 0;
let orbitAngle = 0;

function getRadii(){
    return {
        rx: area.clientWidth * 0.32,
        ry: area.clientHeight * 0.26,
        rz: area.clientWidth * 0.22
    };
}

let radii = getRadii();
window.addEventListener("resize", () => radii = getRadii());

const total = tiles.length;
const baseAngles = [];

tiles.forEach((_, i) => {
    baseAngles.push((i / total) * Math.PI * 2);
});

function animateSkills(){
    spinY += 0.12;
    orbitAngle += 0.004;

    ring.style.transform = `
        rotateX(-12deg)
        rotateY(${spinY}deg)
    `;

    tiles.forEach((tile, i) => {
        const a = baseAngles[i] + orbitAngle;

        const x = radii.rx * Math.cos(a) + area.clientWidth / 2;
        const y = radii.ry * Math.sin(a) + area.clientHeight / 2;
        const z = radii.rz * Math.sin(a);

        tile.style.transform = `
            translate3d(${x}px, ${y}px, ${z}px)
            rotateY(${-spinY}deg)
        `;

        const light = (Math.cos(a) + 1) / 2;
        tile.style.opacity = 0.45 + light * 0.55;
    });

    requestAnimationFrame(animateSkills);
}

if(ring){
    animateSkills();
}









(function () {
  emailjs.init("cWKdKsN299hNOMmbv"); // from EmailJS
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const templateParams = {
    name: this.name.value,
    email: this.email.value,
    mobile: this.mobile.value,
    subject: this.subject.value,
    message: this.message.value,
    time: new Date().toLocaleString()
  };

  emailjs.send(
    "service_5vgpbfe",
    "template_xm0l64z",
    templateParams
  )
  .then(() => {
    alert("✅ Message sent successfully!");
    this.reset();
  })
  .catch((error) => {
    alert("❌ Failed to send message");
    console.error(error);
  });
});
