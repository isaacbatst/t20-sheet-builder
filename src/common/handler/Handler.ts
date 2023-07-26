import {SheetBuilderError} from '../../domain/errors/SheetBuilderError';

export abstract class Handler<Request, Return> {
	protected nextHandler: Handler<Request, Return> | undefined;

	public setNext(handler: Handler<Request, Return>): Handler<Request, Return> {
		this.nextHandler = handler;
		return handler;
	}

	public execute(request: Request): Return {
		if (this.shouldHandle(request)) {
			return this.handle(request);
		}

		if (this.nextHandler) {
			return this.nextHandler.execute(request);
		}

		throw new SheetBuilderError('UNHANDLED_REQUEST');
	}

	protected abstract handle(request: Request): Return;
	protected abstract shouldHandle(request: Request): boolean;
}
