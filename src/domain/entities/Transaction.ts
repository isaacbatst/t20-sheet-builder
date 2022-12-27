import {ActionsQueue} from './ActionsQueue';
import {BuildStep} from './BuildStep';
import type {ActionInterface, ActionType} from './Sheet/SheetActions';
import type {SheetBaseInterface} from './Sheet/SheetBaseInterface';

export type Dispatch = <T extends ActionType>(action: ActionInterface<T>, sheet: SheetBaseInterface) => void;

export type TransactionInterface = {
	dispatch: Dispatch;
};

export class Transaction {
	readonly actionsQueue = new ActionsQueue();

	dispatch: Dispatch = (action, sheet) => {
		this.enqueueAction(action);
		const handle = sheet.actionHandlers[action.type];
		handle(action.payload, this.dispatch);
	};

	saveBuildSteps(buildSteps: BuildStep[], sheet: SheetBaseInterface) {
		while (this.actionsQueue.getSize() > 0) {
			const action = this.actionsQueue.dequeue();
			buildSteps.push(new BuildStep(action, sheet));
		}
	}

	private enqueueAction(action: ActionInterface): void {
		this.actionsQueue.enqueue(action);
	}
}
