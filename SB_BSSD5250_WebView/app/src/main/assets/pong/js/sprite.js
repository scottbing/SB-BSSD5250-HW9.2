class Sprite
{
    #img;

    width;
    height;
    x;
    y;
    alpha = 1;

    constructor(img, width, height, x = 0, y = 0)
    {
        this.#img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    setImage(img)
    {
        this.#img = img;
    }

    draw()
    {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.#img, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}