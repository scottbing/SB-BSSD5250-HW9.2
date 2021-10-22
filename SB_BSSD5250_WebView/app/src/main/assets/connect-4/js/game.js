class Game
{
    #noRows = 6;
    #noCols = 7;
    #currentPlayerIndex;
    #currentMode;
    state;

    board;
    players;
    discs;
    currentDisc;

    constructor(mode)
    {
        this._init(mode);
        this._setEventHandlers();
        this.state = "menu";
    }

    get noRows() { return this.#noRows; }
    get noCols() { return this.#noCols; }

    get currentPlayer()
    {
        return this.players[this.#currentPlayerIndex];
    }

    get scale()
    {
        return Math.min(
            canvas.width / this.#noCols,
            canvas.height / (this.#noRows + 1)
        );
    }

    get gameOver()
    {
        return (
            this.state === "yellow-wins" ||
            this.state === "red-wins" ||
            this.state === "draw"
        );
    }

    _init(mode)
    {
        this.board = new Board(6, 7);
        this.players = [];
        
        /*
            1: player vs player
            2: player vs AI
            3: AI vs player
            4: AI vs AI
        */
        if(mode === 1) this.players.push(new Player(1), new Player(2));
        if(mode === 2) this.players.push(new Player(1), new PlayerAI(2, this.board));
        if(mode === 3) this.players.push(new PlayerAI(1, this.board), new Player(2));
        if(mode === 4) this.players.push(new PlayerAI(1, this.board), new PlayerAI(2, this.board));

        this.#currentMode = mode;
        this.discs = [];
        this.#currentPlayerIndex = 0;
        this.state = "playing";

        this._createDisc();
    }

    _createDisc()
    {
        this.currentDisc = new Disc(this.currentPlayer.id);
        this.discs.push(this.currentDisc);
    }

    _executeMove(pos)
    {
        this.currentDisc.targetIndex = pos;
        this.currentDisc.state = "dropping";
        this.state = "animation";
    }

    _nextPlayer()
    {
        this.#currentPlayerIndex++;

        if(this.#currentPlayerIndex >= this.players.length) this.#currentPlayerIndex = 0;
    }

    _checkResult()
    {
        let playerOneWin = this.board.checkWin(this.players[0].id),
            playerTwoWin = this.board.checkWin(this.players[1].id);

        if(playerOneWin) this.state = "yellow-wins";
        if(playerTwoWin) this.state = "red-wins";

        if(!playerOneWin && !playerTwoWin)
        {
            if(this.board.isFull) this.state = "draw";
        }
    }

    _setEventHandlers()
    {
        canvas.onclick = (e) => {
            if(this.state === "playing" && this.currentPlayer.entity === "human")
            {
                let col = Math.floor(mouse.x / this.scale);
                let pos = this.currentPlayer.dropDisc(this.board, col);

                if(pos !== false) this._executeMove(pos);
            }

            if(this.gameOver)
            {
                reset(this.#currentMode);
            }
        }
    }

    getMode(buttonId)
    {
        if(buttonId === "two-player") return 1;
        if(buttonId === "player-ai") return 2;
        if(buttonId === "ai-player") return 3;
        if(buttonId === "two-ai") return 4;
    }

    reset(mode)
    {
        this._init(mode);
    }

    tick()
    {
        //Business logic
        this.discs.forEach(disc => {
            disc.tick(this.board, this.scale);
        });

        switch(this.state)
        {
            case "playing":
                if(this.currentPlayer.entity === "AI")
                {
                    let pos = this.currentPlayer.makeRandomMove(this.#noCols);

                    if(pos !== false)
                    {
                        let col = pos[1];
                        this.currentDisc.setColumn(col, this.scale);
                        this._executeMove(pos);
                    }
                }

                break;

            case "animation":
                if(this.currentDisc.state === "resting")
                {
                    this._checkResult();
                    this._nextPlayer();
                    if(!this.gameOver) this._createDisc();

                    if(this.state === "animation") this.state = "playing";
                }

                break;
        }

        //GUI
        this.discs.forEach(disc => {
            disc.draw(this.scale);
        });

        this.board.draw(this.scale);
    }
}