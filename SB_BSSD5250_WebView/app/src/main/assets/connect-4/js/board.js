class Board
{
    cells;

    constructor(row, col)
    {
        this._createCells(row, col);
    }

    get noRows() { return this.cells.length; }
    get noCols() { return this.cells[0].length; }

    get isFull()
    {
        let full = true;

        this.cells.forEach(row => {
            row.forEach(cell => {
                if(cell.occupied === 0) full = false;
            });
        });

        return full;
    }

    _createCells(row, col)
    {
        this.cells = [];

        for(let i = 0; i < row; i++)
        {
            this.cells.push([]);

            for(let j = 0; j < col; j++)
            {
                this.cells[i].push(new Cell(i, j));
            }
        }
    }

    _checkWinHorizontal(playerId)
    {
        let winFound = false;

        this.cells.forEach(row => {
            for(let j = 0; j < row.length - 3; j++)
            {
                //Search for 4 in a row
                let isWin = true;

                for(let k = 0; k < 4; k++)
                {
                    if(row[j + k].occupied !== playerId)
                    {
                        isWin = false;
                        break;
                    }
                }

                if(isWin) winFound = true;
            }
        });

        return winFound;
    }

    _checkWinVertical(playerId)
    {
        let winFound = false;

        for(let j = 0; j < this.noCols; j++)
        {
            for(let i = 0; i < this.noRows - 3; i++)
            {
                let isWin = true;

                for(let k = 0; k < 4; k++)
                {
                    let cell = this.cells[i + k][j];

                    if(cell.occupied !== playerId)
                    {
                        isWin = false;
                        break;
                    }
                }

                if(isWin) winFound = true;
            }
        }

        return winFound;
    }

    _checkWinDiagonalUp(playerId)
    {
        let winFound = false;

        for(let j = 0; j < this.noCols - 3; j++)
        {
            for(let i = 0; i < this.noRows - 3; i++)
            {
                let isWin = true;

                for(let k = 0; k < 4; k++)
                {
                    let cell = this.cells[i+k][j+k];

                    if(cell.occupied !== playerId)
                    {
                        isWin = false;
                        break;
                    }
                }

                if(isWin) winFound = true;
            }
        }

        return winFound;
    }

    _checkWinDiagonalDown(playerId)
    {
        let winFound = false;

        for(let j = 0; j < this.noCols - 3; j++)
        {
            for(let i = 3; i < this.noRows; i++)
            {
                let isWin = true;

                for(let k = 0; k < 4; k++)
                {
                    let cell = this.cells[i-k][j+k];

                    if(cell.occupied !== playerId)
                    {
                        isWin = false;
                        break;
                    }
                }

                if(isWin) winFound = true;
            }
        }

        return winFound;
    }

    checkWin(playerId)
    {
        return (
            this._checkWinHorizontal(playerId) ||
            this._checkWinVertical(playerId) ||
            this._checkWinDiagonalUp(playerId) ||
            this._checkWinDiagonalDown(playerId)
        );
    }

    draw(scale)
    {
        this.cells.forEach(row => {
            row.forEach(cell => {
                cell.draw(scale);
            });
        });
    }

}