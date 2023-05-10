import type {ActionInterface, ActionPayload, ActionType} from '../Sheet/SheetActions';
import {type SheetInterface} from '../Sheet/SheetInterface';
import {type TransactionInterface} from '../Sheet/TransactionInterface';

export type ActionParams<
	A extends ActionType,
	S extends SheetInterface = SheetInterface,
> = {
	type: A;
	payload: ActionPayload<A>;
	transaction: TransactionInterface<S>;
};

export type ActionSubClassParams<
	T extends ActionType,
	S extends SheetInterface = SheetInterface,
> = Omit<ActionParams<T, S>, 'type'>;

export abstract class Action<
	A extends ActionType = ActionType,
	S extends SheetInterface = SheetInterface,
> implements ActionInterface<A> {
	readonly type: A;
	readonly payload: ActionPayload<A>;
	readonly transaction: TransactionInterface<S>;
	readonly description: string;

	constructor(params: ActionParams<A, S>) {
		this.type = params.type;
		this.payload = params.payload;
		this.transaction = params.transaction;
		this.description = this.getDescription();
	}

	abstract execute(): void;
	abstract getDescription(): string;
}
