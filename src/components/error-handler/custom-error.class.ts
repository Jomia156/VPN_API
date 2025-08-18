export class CustomError extends Error {
  public msg: string
  public statusCode: number
  public defaultError: Error

  constructor (statusCode: number, msg: string, e: Error, ...args) {
    super()
    this.msg = msg
    this.statusCode = statusCode
    this.defaultError = e
   }
}
