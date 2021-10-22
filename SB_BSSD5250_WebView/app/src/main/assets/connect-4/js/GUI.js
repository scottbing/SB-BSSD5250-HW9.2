class GUI
{
    static drawMenuButtons(buttons)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        buttons.forEach(button => {
            button.draw();
        });
    }

    static drawMenu(scale)
    {
        let width = scale*3,
            x = canvas.width/2 - width/2,
            y = canvas.height/2;

        let buttons = [
            new Button(x, y - scale*1.5, width, "auto", "two-player", img.button_two_player),
            new Button(x, y - scale*0.5, width, "auto", "player-ai", img.button_player_ai),
            new Button(x, y + scale*0.5, width, "auto", "ai-player", img.button_ai_player),
            new Button(x, y + scale*1.5, width, "auto", "two-ai", img.button_two_ai),
        ]

        GUI.drawMenuButtons(buttons);

        canvas.addEventListener("mousemove", (e) => {
            if(GAME.state === "menu")
            {
                buttons.forEach(button => {
                    if(button.isHover())
                    {
                        button.alpha = 0.5;

                        if(mouse.clicked)
                        {
                            let mode = GAME.getMode(button.id);
                            reset(mode);
                        }
                    } else
                    {
                        button.alpha = 1;
                    }
                });

                GUI.drawMenuButtons(buttons);
            }
        });
    }

    static drawGameOver(result, scale, noRows)
    {
        let text;

        if(result === "yellow-wins") text = "Yellow Wins";
        if(result === "red-wins") text = "Red Wins";
        if(result === "draw") text = "Tie Game";

        let textSize = scale * 0.4,
            height = canvas.height - scale * noRows - scale/2 + textSize/2;

        ctx.save();

        ctx.font = textSize + "px Trebuchet MS";
        ctx.fillStyle = "#0000ff";
        ctx.textAlign = "center";
        ctx.fillText(text, canvas.width/2, height);

        ctx.restore();
    }
}