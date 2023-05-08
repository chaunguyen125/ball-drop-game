import Active from "./Active";
import { Grid } from "./Interfaces";

class Board {
  private grid: Grid;
  private row: number;
  private col: number

  constructor(row: number, col:number) {
    this.row = row
    this.col = col

  }

  initBoard(row: number, col: number) {
    this.grid = [];

    for (let i = 0; i < row; i++) {
      this.grid.push([]);
      for (let j = 0; j < col; j++) {
        // if (i == 0 || i == row - 1) this.grid[i].push(0);

        if (i % 2 == 0) {
          if (j % 2 == 0) {
            this.grid[i].push(1);
          } else this.grid[i].push(0);
        } else {
          if (j % 2 == 1) {
            this.grid[i].push(1);
          } else this.grid[i].push(0);
        }
      }
    }
    return this.grid;
  }
}

export default Board;
