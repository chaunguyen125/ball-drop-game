import * as _ from "lodash";
import Board from "./Board";
import Active from "./Active";
import * as PIXI from "pixi.js"


export class Main extends PIXI.Application {
  public to = Date.now() / 1000;
  public row = 10;
  public col = 10;
  public stepArr: number[] = [];
  public stepArrShuffled: number[] = []
  public constructor() {
    let view = document.querySelector("#canvasContainer canvas") as HTMLCanvasElement;
    super({
      view: view,
      backgroundColor: 0xb5b5b5,
      antialias: true,
      forceCanvas: false,
    });
    this.init()

    // const loader = new PIXI.Loader()
  }
  countStep = (positionStart: number[], positionEnd: number[]) => {
    let leftStep: number;
    let rightStep: number;
  
    leftStep = (positionStart[1] - positionEnd[1] + this.row - 1) / 2;
    rightStep = this.row - 1 - leftStep;
    return { leftStep, rightStep };
  };
  
  countStepArray = (leftStep: number, rightStep: number) => {
    for (let i = 0; i < leftStep; i++) {
      this.stepArr.push(-1);
    }
    for (let i = 0; i < rightStep; i++) {
      this.stepArr.push(1);
    }
    return _.shuffle(this.stepArr);
  };
  
  moveBall = (active: Active) => {
    console.log('active positon start:', active.position);
    if(active.position[1]==0 && this.stepArrShuffled[0]==-1) {
      let index = _.indexOf(this.stepArrShuffled, 1)
      active.updatePosition(active.position[0]+1, active.position[1]+1)
      this.stepArrShuffled.splice(index,1)
      console.log('active positon:', active.position);
      console.log('stepArrShuffled', this.stepArrShuffled);
      
    }
    else if(active.position[1]==(this.col - 1) && this.stepArrShuffled[0]==1) {
      let index = _.indexOf(this.stepArrShuffled, -1)
      active.updatePosition(active.position[0]+1, active.position[1]-1)
      this.stepArrShuffled.splice(index, 1)
      console.log('active positon:', active.position);
      console.log('stepArrShuffled', this.stepArrShuffled);
  
    }
    else {
      active.updatePosition(active.position[0]+1, active.position[1] + this.stepArrShuffled[0])
      this.stepArrShuffled.shift()
      console.log('active positon:', active.position);
      console.log('stepArrShuffled', this.stepArrShuffled);
  
    }
  }
  
  // initPixiApp = () => {
  //   this.app = new PIXI.Application()
  //   document.body.appendChild(this.app.view)
  // }
  
  init = () => {
    let board = new Board(this.row, this.col);
    let grid = board.initBoard(this.row, this.col);
    let active = new Active();
    active.initActive(1);
    active.updatePosition(1, 4);
    let { leftStep, rightStep } = this.countStep([0, 1], [9, 0]);
    active.position = [0,1]
    console.log("left, right", leftStep, rightStep);
    this.stepArrShuffled = this.countStepArray(leftStep, rightStep);
    console.log("stepArrShuffled", this.stepArrShuffled);
    console.log("grid", grid);
    while(active.position[0] < this.row - 1) {
      this.moveBall(active)
    }
  };
}

new Main()
// const app = new PIXI.Application();
// const canvasNode = app.view as HTMLCanvasElement;
// const containerNode = document.createElement('div');
// containerNode.appendChild(canvasNode);
// document.body.appendChild(containerNode);