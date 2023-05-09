import {type Action} from '../Action/Action';
import {type SheetInterface} from './SheetInterface';

export type TransactionInterface<S extends SheetInterface = SheetInterface> = {
	sheet: S;
	run(action: Action): void;
	commit(): void;

};
