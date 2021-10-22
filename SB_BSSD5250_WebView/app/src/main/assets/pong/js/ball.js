class Ball extends Sprite
{
    #speed;
    #angle;
    #deltaBounce = 8;
    #previousCollisionObject;

    alive;

    constructor(radius, speed)
    {
        super(img.ball, radius*2, radius*2);
        this.#speed = speed;
        this.#angle = Math.random() * (-Math.PI + 2*Math.PI*0.3) - Math.PI*0.3;
    }

    get xCentre()
    {
        return this.x + this.width/2;
    }

    get yCentre()
    {
        return this.y + this.height/2;
    }

    get xVel()
    {
        return this.#speed * Math.cos(this.#angle);
    }

    get yVel()
    {
        return this.#speed * -Math.sin(this.#angle);
    }

    get hitbox()
    {
        return new SAT.Circle(new SAT.Vector(this.xCentre, this.yCentre), this.width/2);
    }

    get speed() { return this.#speed; }
    set speed(v) { this.#speed = v; }

    _bounce(objectAngle)
    {
        this.#angle = 2 * objectAngle - this.#angle;
    }

    _checkCollision(box)
    {
        return SAT.testPolygonCircle(box.hitbox, this.hitbox);
    }

    makeBounce(box)
    {
        if(box !== this.#previousCollisionObject)
        {
            this._bounce(box.angle);
            this.#previousCollisionObject = box;
        }
    }

    init()
    {
        this.x = canvas.width/2 - this.width/2;
        this.y = canvas.height/4;
        this.alive = true;
    }

    tick(boxes)
    {
        this.x += this.xVel;
        this.y += this.yVel;

        boxes.forEach(box => {
            if(this._checkCollision(box))
            {
                if(box.properties.includes("harmful")) this.alive = false;
                if(box.properties.includes("powerup")) box.activatePowerup(this);
                if(box.properties.includes("solid")) this.makeBounce(box);
            }
        });
    }
}