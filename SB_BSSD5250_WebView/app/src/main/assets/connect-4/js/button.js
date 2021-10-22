class Button
{
    #x;
    #y;
    #width;
    #height;
    #id;

    img;
    alpha;

    constructor(x, y, width, height, id, img)
    {
        this.#id = id;
        this.img = img;

        this.#x = x;
        this.#y = y;
        this.#width = width;

        if(height === "auto")
        {
            this.#height = width * this.img.height/this.img.width;
        } else
        {
            this.#height = height;
        }
    }

    get id() { return this.#id; }

    get hitbox()
    {
        return new SAT.Box(new SAT.Vector(this.#x, this.#y), this.#width, this.#height).toPolygon();
    }

    isHover()
    {
        return SAT.pointInPolygon(new SAT.Vector(mouse.x, mouse.y), this.hitbox);
    }

    draw()
    {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.img, this.#x, this.#y, this.#width, this.#height);
        ctx.restore();
    }
}