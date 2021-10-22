const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

/*-------------------------Images-------------------------*/
const img = {};

img.null = new Image();
img.null.src = "img/null.svg";

img.ball = new Image();
img.ball.src = "img/ball.svg";

img.paddle = new Image();
img.paddle.src = "img/paddle.svg";

img.powerup_speed = new Image();
img.powerup_speed.src = "img/powerups/powerup-speed.svg";

img.powerup_ghost = new Image();
img.powerup_ghost.src = "img/powerups/powerup-ghost.svg";
/*-------------------------End of images-------------------------*/

let GAME, KEYS = [];

function init()
{
	//Initialise objects
	for(let i = 0; i < 255; i++)
	{
		KEYS.push(false);
	}

    reset();

    //Set event handlers
    document.onkeyup = (e) => {
    	KEYS[e.keyCode] = false;
    }

    document.onkeydown = (e) => {
    	KEYS[e.keyCode] = true;
    }
}

function reset()
{
    GAME = new Game();
    GAME.init();
}

function tick()
{
    let toTick = true;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    switch(GAME.state)
    {
        case "playing":
            GAME.tick();
            break;

        case "game over":
            GAME.tick();
            GUI.drawGameOver(GAME.duration, GAME.scale);
            toTick = false;
            break;
    }

    if(toTick) window.requestAnimationFrame(tick);
}

window.onload = () => {
    console.log("Pong by LiteTJ");
    console.log("---------------------------------------------------------");
    console.log("Thank you for playing the game!");

    init();
    tick();
}

window.onkeypress = (e) => {
    if(e.code === "Space")
    {
        if(GAME.state === "game over")
        {
            reset();
            tick();
        }
    }
}
