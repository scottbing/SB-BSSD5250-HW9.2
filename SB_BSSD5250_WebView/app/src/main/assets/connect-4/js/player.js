class Player
{
    #id;
    #entity;

    constructor(id)
    {
        this.#id = id;
        this.#entity = "human";
    }

    get id() { return this.#id; }
    get entity() { return this.#entity; }

    set entity(entity) { this.#entity = entity }

    dropDisc(board, col)
    {
        let row = 0;

        while(true)
        {
            if(row >= board.noRows)
            {
                return false; //Chosen column is full
            }

            let cell = board.cells[row][col];

            if(cell.occupied === 0)
            {
                cell.occupied = this.#id;
                return [row, col]; //Disc is dropped
            }

            row++;
        }
    }
}