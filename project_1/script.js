// Datatabeller brukt i canvas API'et
const grassCoords = [
    [0, 200],
    [0, 200],
    [0, 150],
    [100, 150],
    [130, 140],
    [200, 140],
];
const sunRayCoords = [
    [90, 90],
    [0, 0],
    [112, 60],
    [0, 0],
    [120, 30],
    [0, 0],
    [120, 10],
    [0, 0],
    [60, 120],
    [0, 0],
    [30, 120],
    [0, 0],
    [10, 120],
    [0, 0],
    [-90, -90],
    [0, 0],
    [-112, -60],
    [0, 0],
    [-120, -30],
    [0, 0],
    [-120, -10],
    [0, 0],
    [-60, -112],
    [0, 0],
    [-30, -120],
    [0, 0],
    [-10, -120],
    [0, 0],
    [90, -90],
    [0, 0],
    [112, -60],
    [0, 0],
    [120, -30],
    [0, 0],
    [120, -10],
    [0, 0],
    [60, -112],
    [0, 0],
    [30, -120],
    [0, 0],
    [10, -120],
    [0, 0],
    [-90, 90],
    [0, 0],
    [112, -60],
    [0, 0],
    [-120, 30],
    [0, 0],
    [-120, 10],
    [0, 0],
    [-60, 112],
    [0, 0],
    [-30, 120],
    [0, 0],
    [-10, 120],
    [0, 0],
];

let svgIsNight = false;
let canvasIsNight = false;
const canvas = document.getElementById("canvasArt");
const ctx = canvas.getContext("2d");
let canvasRotModifier = 60000;

// Endrer tiden fra dag til natt / natt til dag ved å trykke
// på himmelen eller gresset på SVG-kunstverket
$("#svgSky, #svgGrass").on("click", function (event) {
    $("#svgSun").toggle();
    $("#svgSunRays").toggle();
    $("#svgMoon").toggle();
    if (svgIsNight) {
        $("#svgSky").css("fill", "rgb(67, 203, 249)");
        $("#svgGrass").css("fill", "rgb(0, 128, 0)");
        svgIsNight = false;
        return;
    }
    $("#svgSky").css("fill", "rgb(16, 25, 28)");
    $("#svgGrass").css("fill", "rgb(24, 77, 24)");
    svgIsNight = true;
});

// reduserer animasjonstiden med 40% hver gang solen blir trykket på
// tilbakestilles til 60s når animasjonstiden er for liten, siden
// det ville sett ut som at solen sluttet å spinne
function makeSunSpinFaster() {
    if (svgIsNight) {
        return;
    }
    let rotationSpeed = $("#svgSunRays").css("animation-duration");
    let duration = rotationSpeed.split("s")[0];
    let newDuration = duration * 0.6;
    if (newDuration < 10 ** -5) {
        newDuration = 60;
    }
    $("#svgSunRays").css({
        animationDuration: newDuration + "s",
    });
}

// ser om området rundt solen blir trykket på.
//  true --> roterer fortere
//  false --> bytter fra dag til natt / natt til dag.
// Kode fra Approach #1 på https://medium.com/@lavrton/hit-region-detection-for-html5-canvas-and-how-to-listen-to-click-events-on-canvas-shapes-815034d7e9f8
//  ga mye innsikt og gjorde dette mulig.
canvas.addEventListener("click", (event) => {
    const CanvasPos = {
        x: document.getElementById("canvasArt").getBoundingClientRect().x,
        y: document.getElementById("canvasArt").getBoundingClientRect().y,
    };
    const mouseRelativeToCanvas = {
        x: event.clientX - CanvasPos.x,
        y: event.clientY - CanvasPos.y,
    };
    if (
        !canvasIsNight &&
        Math.sqrt(mouseRelativeToCanvas.x ** 2 + mouseRelativeToCanvas.y ** 2) <
            75
    ) {
        canvasRotModifier /= 10;
        console.log(canvasRotModifier);
        if (canvasRotModifier === 6) {
            canvasRotModifier = 60000;
        }
        return;
    }
    canvasIsNight = !canvasIsNight;
});

function drawCanvas() {
    ctx.clearRect(0, 0, 200, 200);

    // Himmel
    if (canvasIsNight) {
        ctx.fillStyle = "rgb(16, 25, 28)";
    } else {
        ctx.fillStyle = "rgb(67, 203, 249)";
    }
    ctx.fillRect(0, 0, 200, 200);

    // Gress
    if (canvasIsNight) {
        ctx.fillStyle = "rgb(24, 77, 24)";
    } else {
        ctx.fillStyle = "green";
    }
    ctx.beginPath();
    ctx.moveTo(200, 200);
    grassCoords.forEach((coords) => {
        ctx.lineTo(coords[0], coords[1]);
    });
    ctx.closePath();
    ctx.fill();

    const time = new Date();
    if (canvasIsNight) {
        // Måne
        ctx.fillStyle = "#FEFCD7";
        ctx.beginPath();
        ctx.arc(130, 40, 35, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    } else {
        // Sol
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(0, 0, 75, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        // Solstrålene, bruker sanntid til animering
        // Stor hjelp fra https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
        // hjalp forstå hvordan animasjon med canvas API'et fungerte.
        ctx.save();
        ctx.rotate(
            ((2 * Math.PI) / 60) * time.getSeconds() +
                ((2 * Math.PI) / canvasRotModifier) * time.getMilliseconds()
        );
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        sunRayCoords.forEach((sunRayCoord) => {
            ctx.lineTo(sunRayCoord[0], sunRayCoord[1]);
        });
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }

    window.requestAnimationFrame(drawCanvas);
}

// Slår av/på synligheten på dokumentasjonen, samt. endrer teksten på knappen.
$(".docButton").on("click", function (event) {
    $(".documentation").toggle();
    if ($(".docButton").html() == "Vis dokumentasjon") {
        $(".docButton").html("Skjul dokumentasjon");
        return;
    }
    $(".docButton").html("Vis dokumentasjon");
});

window.requestAnimationFrame(drawCanvas);
