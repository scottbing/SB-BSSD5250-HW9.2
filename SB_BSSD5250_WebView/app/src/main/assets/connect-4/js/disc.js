class Disc
{
    #x;
    #y;
    #id;

    targetIndex;
    state;

    constructor(id)
    {
        this.#id = id;
        this.state = "holding";
    }

    get img()
    {
        if(this.#id === 1) return img.disc_yellow;
        if(this.#id === 2) return img.disc_red;
    }

    getY(row, scale)
    {
        return canvas.height - (row + 1) * scale;
    }

    setColumn(col, scale)
    {
        this.#x = col * scale;
    }

    tick(board, scale)
    {
        switch(this.state)
        {
            case "holding":
                let col = Math.floor(mouse.x / scale);

                this.#x = col * scale;
                this.#y = this.getY(board.noRows, scale);
                break;

            case "dropping":
                let targetY = this.getY(this.targetIndex[0], scale);

                this.#y += scale/2;

                //Sometimes this.#y becomes isNaN if user clicks too fast, but why?
                //Same bug causes disc not to be shown on board
                if(this.#y >= targetY || isNaN(this.#y))
                {
                    this.#y = targetY;
                    this.state = "resting";
                }

                break;
        }
    }

    draw(scale)
    {
        ctx.drawImage(this.img, this.#x, this.#y, scale, scale);
    }
}