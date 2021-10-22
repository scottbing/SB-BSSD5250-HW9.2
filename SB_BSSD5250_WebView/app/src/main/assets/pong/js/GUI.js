class GUI
{
    static drawGameOver(duration, scale)
    {
        let fontSize = scale;

        ctx.save();

        ctx.font = fontSize*2 + "px Trebuchet MS";
        ctx.fillStyle = "#00aa88";
        ctx.textAlign = "center";
        ctx.fillText("TIME: " + duration + "s", canvas.width/2, canvas.height*0.4);

        ctx.font = fontSize + "px Trebuchet MS";
        ctx.fillText("- space to restart -", canvas.width/2, canvas.height*0.6);

        ctx.restore();
    }
}