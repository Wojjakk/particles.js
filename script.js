var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var cursorX = 0;
var cursorY = 0;
var clickX = [];
var clickY = [];
var lifetime = [];
x = 50;
y = 50;
var dx = [];
var dy = [];
var colors = [];
class Color {
    static colors = [
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#FF69B4",
        "#ab00ba"
    ];

    static Random() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
}

function directionFromAngle(degree) {
    let radians = degree * (Math.PI / 180);
    return {x: Math.cos(radians) * randomFloat(0, 4), y: Math.sin(radians) * randomFloat(0, 4)};
}

function draw()
{   
    ctx.globalCompositeOperation = 'screen';
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (let i = 0; i < clickX.length; i++) {
        ctx.beginPath();
        ctx.arc(clickX[i], clickY[i], 1, 0, Math.PI*2);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.closePath();
        clickX[i] += dx[i];
        clickY[i] += dy[i];
        lifetime[i]++;
        if(lifetime[i] >= 2500){
            delete clickX[i];
            delete clickY[i];
            delete lifetime[i];
            delete dx[i];
            delete dy[i];
            delete colors[i];
        }
    }
}
setInterval(draw, 20);
document.onmousemove = function(e)
{
    cursorX = e.pageX;
    cursorY = e.pageY;
}

function randomNumber(min, max)
{
    return Math.round(Math.random() * (max - min) + min);
}
function randomFloat(min, max) {
    return (Math.random() * (max - min) + min);
  }

document.addEventListener("click", (e) =>{
    for(i = 0; i < 500; i++)
    {
    clickX.push(e.clientX);
    clickY.push(e.clientY);
    lifetime.push(0);
    let {x,y} = directionFromAngle(randomFloat(0,360));
    dx.push(x);
    dy.push(y);
    colors.push(Color.Random());
    }
})

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for(i = 0; i<2; i++)
{
    for(i = 0; i < 500; i++)
    {
        clickX.push(500 + i);
        clickY.push(500 + i);
        let {x,y} = directionFromAngle(randomFloat(0,360));
        dx.push(x);
        dy.push(y);
        colors.push(Color.Random());
    }
}