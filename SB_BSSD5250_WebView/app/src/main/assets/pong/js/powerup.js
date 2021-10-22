class Powerup extends Sprite
{
    #IDS = ["speed", "ghost"];

    #duration = 5000;
    #id;
    #properties = ["powerup"];

    constructor(width, x, y)
    {
        super(img.null, width, width, x, y);
        this.#id = this.#IDS[Math.floor(Math.random() * this.#IDS.length)];
        this._updateImage();
    }

    get properties() { return this.#properties; }

    get hitbox()
    {
        return new SAT.Box(new SAT.Vector(this.x, this.y), this.width, this.height).toPolygon();
    }

    _updateImage()
    {
        if(this.#id === "speed") this.setImage(img.powerup_speed);
        if(this.#id === "ghost") this.setImage(img.powerup_ghost);
    }

    _powerupSpeed(ball)
    {
        let multiplier = 2;

        ball.speed *= multiplier;
        setTimeout(() => {
            ball.speed /= multiplier;
        }, this.#duration);
    }

    _powerupGhost(ball)
    {
        let multiplier = 0.1;

        ball.alpha *= multiplier;
        setTimeout(() => {
            ball.alpha /= multiplier;
        }, this.#duration);
    }

    activatePowerup(ball)
    {
        if(this.#id === "speed") this._powerupSpeed(ball);
        if(this.#id === "ghost") this._powerupGhost(ball);

        this.#properties.push("inactive");
    }
}