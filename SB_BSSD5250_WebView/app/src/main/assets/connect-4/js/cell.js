class Cell
{
    #row;
    #col;

    occupied = 0;
    img = img.cell;

    constructor(i, j)
    {
        this.#row = i;
        this.#col = j;
    }

    get colour()
    {
        return "#0000ff";
    }

    draw(scale)
    {
        let x = this.#col * scale,
            y = canvas.height - ((this.#row + 1) * scale);

        ctx.drawImage(this.img, x, y, scale, scale);
    }
}