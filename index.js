const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 480;
const pA = document.getElementById("pA");

//________________________________
//________________________________ Variables
let Mouse = {
    x: null,
    y: null,
};
let particlesArr = [];

//________________________________
//________________________________ Functions
canvas.addEventListener("mousemove", (event)=>{
    Mouse.x = event.clientX;
    Mouse.y = event.clientY;
    init(5);
})

function Particle(x, y, size, col1, col2, vx, vy){
    this.x = x;
    this.y = y;
    this.size = size;
    this.col1 = col1;
    this.col2 = col2;
    this.vx = vx;
    this.vy = vy;

    this.update = ()=>{
        x += vx;
        y += vy;
    };

    this.draw = (boxOrCircle)=>{
        if(boxOrCircle == true){
            ctx.fillStyle = col2;
            ctx.fillRect(x, y, size, size);
            size = size/1.05;
            return;
        }
        ctx.strokeStyle = col1;
        ctx.fillStyle = col2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI *2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    };
}

function init(numOfParticles){
    for (let i = 0; i < numOfParticles; i++){
        particlesArr.push( new Particle(Mouse.x || Math.random() * canvas.width, Mouse.y || Math.random() * canvas.height, 10, "gray", "tomato", Math.random()*5, Math.random()*3));
        setTimeout(()=>{
            particlesArr.splice(0, 1);
        }, 1000)
    };
};
function renderParticles(){
    if(particlesArr){
        for(let i = 0; i < particlesArr.length; i++){
            particlesArr[i].update();
            particlesArr[i].draw(true);
        };
    };
};

//________________________________
//________________________________ Setup
init(300);

//________________________________
//________________________________ Update
setInterval((x)=>{
    ctx.fillStyle = "rgba(0, 0, 0, .1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    renderParticles();
    pA.textContent = particlesArr.length;
    // ctx.fillStyle = "rgba(0, 0, 0, .2)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle = "white"
    // ctx.fillRect(Mouse.x, Mouse.y, 10, 10);
}, 1000/ 30);