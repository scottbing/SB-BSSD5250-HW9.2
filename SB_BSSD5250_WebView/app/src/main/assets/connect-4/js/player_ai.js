class PlayerAI extends Player
{
	Board;

	constructor(id, board)
	{
		super(id);
		this.entity = "AI";
		this.Board = board;
	}

	makeRandomMove(noCols)
	{
		let validMove = false;

		do
		{
			let col = Math.floor(Math.random() * noCols);

			validMove = this.dropDisc(this.Board, col);
		} while(!validMove);

		return validMove;
	}
}