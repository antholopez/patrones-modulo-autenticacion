interface Message {
  operation(
    statusCode: number,
    message: string | string[],
    data?: object
  ): ResponseMessage;
}

interface ResponseMessage {
  statusCode: number;
  body: {
    code: number;
    message: string | string[];
    data?: {};
  };
}

class Result {
  private statusCode: number;
  private code: number;
  private message: string | string[];
  private data?: any;

  constructor(statusCode: number, code: number, message: string | string[], data?: any) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  body(): ResponseMessage {
    return {
      statusCode: this.statusCode,
      body: {
        code: this.code,
        message: this.message,
        data: this.data,
      },
    };
  }
}

abstract class Creator {
  public abstract factoryMethod(): Message;

  public getResult(
    statusCode: number,
    message: string | string[],
    data?: object
  ): ResponseMessage {
    return this.factoryMethod().operation(statusCode, message, data);
  }
}

class ConcreteCreatorSuccess extends Creator {
  public factoryMethod(): Message {
    return new ConcreteSuccess();
  }
}

class ConcreteCreatorError extends Creator {
  public factoryMethod(): Message {
    return new ConcreteError();
  }
}

class ConcreteSuccess implements Message {
  public operation(
    statusCode: number,
    message: string,
    data: object
  ): ResponseMessage {
    const result = new Result(statusCode, 0, message, data);
    return result.body();
  }
}

class ConcreteError implements Message {
  public operation(statusCode: number, message: string): ResponseMessage {
    const result = new Result(statusCode, 1, message);
    return result.body();
  }
}

export class MessageUtil {
  static sucess(
    statusCode: number,
    message: string,
    data?: object
  ): ResponseMessage {
    return new ConcreteCreatorSuccess().getResult(statusCode, message, data);
  }

  static error(statusCode: number, message: string | string[]): ResponseMessage {
    return new ConcreteCreatorError().getResult(statusCode, message);
  }
}
