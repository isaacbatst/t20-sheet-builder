import {type Action} from '../Action/Action';
import {BuildingSheetFake} from './BuildingSheetFake';
import {type TransactionInterface} from './TransactionInterface';

export class TransactionFake implements TransactionInterface {
	actions: Action[] = [];
	sheet = new BuildingSheetFake();
	run = vi.fn((action: Action) => this.actions.push(action));
	commit = vi.fn();
}
