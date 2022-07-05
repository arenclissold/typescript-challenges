export class InvalidInputError extends Error {
  constructor(message: string) {
    super()
    this.message = message || 'Invalid Input'
  }
}

type Direction = 'north' | 'east' | 'south' | 'west'
type Coordinates = [number, number]

export class Robot {
  position: Coordinates
  direction: Direction

  constructor() {
    // set the initial direction to north and position to [0, 0]
    this.direction = 'north'
    this.position = [0, 0]
  }
  get bearing(): Direction {
    return this.direction
  }

  get coordinates(): Coordinates {
    return this.position
  }

  place(obj: { x: number; y: number; direction: any }) {
    if (['north', 'east', 'south', 'west'].includes(obj.direction)) {
      this.direction = obj.direction
      this.position = [obj.x, obj.y]
    } else {
      throw new InvalidInputError(`${obj.direction} is an invalid input`)
    }
  }

  evaluate(instructions: string) {
    // split instructions into an array
    const instructionsarray: string[] = instructions.split('')
    // define an array of possible bearings
    const bearings: Direction[] = ['north', 'east', 'south', 'west']
    // iterate over each instruction in the instructions array
    instructionsarray.forEach((instruction) => {
      // find the current index of this.direction in the bearings array to keep track of robot turning
      let bearingIndex: number = bearings.findIndex((bearing: Direction) => bearing === this.direction)
      // change action depending on turning
      switch (instruction) {
        // if left, minus the bearing index by 1 to turn it to the left
        // set the new direction to one down the bearings array.
        case 'L':
          bearingIndex -= 1
          // if -1, set to the end of the array(west)
          if (bearingIndex === -1) bearingIndex = 3
          this.direction = bearings[bearingIndex]
          break
        // if right, plus the bearing index by 1 to turn it to the right
        // set the new direction to one up the bearings array.
        case 'R':
          bearingIndex += 1
          // if 4, set to the start of the array(north)
          if (bearingIndex === 4) bearingIndex = 0
          this.direction = bearings[bearingIndex]
          break
        // if A, advance the robot by changing its position by 1
        case 'A':
          switch (bearingIndex) {
            // if 0/north increase the y position by 1
            case 0:
              this.position[1] += 1
              break
            // if 1/east increase the x position by 1
            case 1:
              this.position[0] += 1
              break
            // if 2/south decrease the y position by 1
            case 2:
              this.position[1] -= 1
              break
            // if 3/west decrease the x position by 1
            case 3:
              this.position[0] -= 1
              break
          }
          break
      }
    })
  }
}
