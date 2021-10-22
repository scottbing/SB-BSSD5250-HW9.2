class Paddle extends Barrier
{
    #xAccConstant = 1.6;
    #xVel = 0;
    #resistance = 0.12;

    constructor(width, x, y)
    {
        super(width, "horizontal", x, y, width/7, ["solid"]);
        this.setImage(img.paddle);
    }

    get id() { return "paddle"; }

    getAcc(scale)
    {
        return this.#xAccConstant * scale/24;
    }

    _constrainPosition()
    {
        if(this.x < 0) this.x = 0;
        if(this.x > canvas.width - this.width) this.x = canvas.width - this.width;
    }

    tick(scale)
    {
        //LEFT key pressed
        if(KEYS[37])
        {
            this.#xVel -= this.getAcc(scale);
        }

        //RIGHT key pressed
        if(KEYS[39])
        {
            this.#xVel += this.getAcc(scale);
        }

        this.#xVel *= (1 - this.#resistance);
        this.x += this.#xVel;

        this._constrainPosition();
    }
}