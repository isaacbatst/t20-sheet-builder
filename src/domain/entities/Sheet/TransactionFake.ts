import {type Action} from '../Action/Action';
import {SheetFake} from './SheetFake';
import {type TransactionInterface} from './TransactionInterface';

export class TransactionFake implements TransactionInterface {
	actions: Action[] = [];
	sheet = new SheetFake();
	run = vi.fn((action: Action) => {
		action.execute();
		this.actions.push(action);
	});

	commit = vi.fn();
}
