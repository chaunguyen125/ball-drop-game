class Active {
  public position: number[]

  initActive(positionX: number) {
    this.position=[0, positionX]
  }

  updatePosition( y:number, x: number) {
    this.position = [y, x]
  }

}

export default Active;
