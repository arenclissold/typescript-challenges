export class Matrix {
  matrixRows: Array<Array<number>>

  constructor(matrix:string) {
    const rows:Array<string> = matrix.split('\n')
    this.matrixRows = rows.map(row => row.split(' ').map(num => parseInt(num)))
  }

  get rows(): Array<Array<number>> {
    return this.matrixRows
  }

  get columns(): Array<Array<number>> {
    const columnsArray:Array<Array<number>> = []
    for (let i = 0; i < this.rows.length; i++) {
      const column:Array<number> = []
      this.rows.forEach((row) => column.push(row[i]))
      columnsArray.push(column)
    }
    return columnsArray
  }
}
