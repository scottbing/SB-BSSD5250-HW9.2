class Game
{
    #scale = Math.min(canvas.width, canvas.height) / 24;
    #deltaSpawnTime = 10000;
    #lastSpawnTime;
    #startTime;

    ball;
    barriers = [];
    powerups = [];
    state;

    constructor()
    {
        this._createBarriers(0);

        this.ball = new Ball(this.#scale/2, this.#scale*0.3);
        this.player = new Paddle(this.#scale*4, canvas.width/2, this.playerY);

        this.#startTime = Date.now();
        this.#lastSpawnTime = this.#startTime;
    }

    get scale() { return this.#scale; }

    get playerY()
    {
        return canvas.height - this.#scale*4;
    }

    get duration()
    {
        return (Date.now() - this.#startTime) / 1000;
    }

    get boxes()
    {
        let boxes = [];

        boxes.push(this.player, this.barriers, this.powerups);

        return [].concat(...boxes);
    }

    _createBarriers(padding)
    {
        this.barriers.push(
            new Barrier(this.#scale*24 - padding*2, "horizontal", padding, padding, this.#scale/6, ["solid"]),
            new Barrier(this.#scale*24 - padding*2, "vertical", this.#scale*24 - padding, padding, this.#scale/6, ["solid"]),
            new Barrier(this.#scale*24 - padding*2, "horizontal", padding, this.#scale*24 - padding, this.#scale/6, ["harmful"]),
            new Barrier(this.#scale*24 - padding*2, "vertical", padding, padding, this.#scale/6, ["solid"])
        );
    }

    _removeInactivePowerups()
    {
        this.powerups.forEach((powerup, i) => {
            if(powerup.properties.includes("inactive"))
            {
                this.powerups.splice(i, 1);
            }
        });
    }

    _spawnPowerup()
    {
        let width = this.#scale*2,
            x = Math.random() * (canvas.width - 2*width) + width,
            y = Math.random() * canvas.height/2 + width;

        this.powerups.push(new Powerup(width, x, y));
    }

    init()
    {
        this.ball.init();
        this.state = "playing";
    }

    tick()
    {
        //Business Logic
        this._removeInactivePowerups();

        this.player.tick(this.scale);
        this.ball.tick(this.boxes);

        if((Date.now() - this.#lastSpawnTime) > this.#deltaSpawnTime)
        {
            this._spawnPowerup();
            this.#lastSpawnTime = Date.now();
        }

        if(!this.ball.alive)
        {
            this.state = "game over";
        }

        //GUI
        this.barriers.forEach(barrier => {
            barrier.draw();
        });

        this.player.draw();
        this.powerups.forEach(powerup => {
            powerup.draw();
        });
        this.ball.draw();
    }
}