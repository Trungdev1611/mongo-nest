import {


} from '@nestjs/common';

class BaseResponse<T> {
    constructor(
      public data: T | null = null,
      public message: string = '',
      public isSuccess: boolean,
      public total?:number
    ) {}
  }

export class BaseController {
  protected successReponse<T>(data:T, message: string = 'success'): BaseResponse<T> {
    return new BaseResponse(data, message, true )
  }

  protected errorResponse<T>(data: T, message: string) {
    return new BaseResponse(data, message, false)
  }

  protected paginateResponse<T>(list: T, total: number, message: string = 'success') {
    return new BaseResponse(list, message, true, total )
  }
}
