export class Clock {
  hour:number
  minute:number

  constructor(hour: number, minute?: number) {
    this.hour = hour
    minute ? this.minute = minute : this.minute = 0
    this.remainder()
  }

  public toString(): string {
    return `${this.hour < 10 ? `0${this.hour}` : this.hour}:${this.minute < 10 ? `0${this.minute}` : this.minute}`
  }

  public plus(minutes: number): string {
    this.minute += minutes
    this.remainder()
    return this.toString()
  }

  public minus(minutes: number): string {
    this.minute -= minutes
    this.remainder()
    return this.toString()
  }

  public equals(clock: Clock): boolean {
    return this.toString() === clock.toString()
  }

  remainder(): void {
    let hourCounter:number = this.hour
    let minuteCounter = this.minute

    const minuteRemainder:number = this.minute % 60
    minuteCounter = minuteRemainder
    const hourExtra:number = Math.floor(this.minute / 60)
    hourCounter += hourExtra

    const hourRemainder:number = hourCounter % 24
    this.hour = hourRemainder
    this.minute = minuteCounter
    if (this.hour < 0) this.hour += 24
    if (this.minute < 0) this.minute += 60
  }
}
