export const HTTP_SUCCESS_CODE = 0;

export class HttpResponseEntity {
  private code: number = HTTP_SUCCESS_CODE;

  private message: string = '';

  private data: object = {};

  constructor(code: number, data: object, message: string) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static create(
    data: object,
    code: number = HTTP_SUCCESS_CODE,
    message: string = '',
  ) {
    return new this(code, data, message);
  }
}
