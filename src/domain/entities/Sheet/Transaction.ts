import {type Action} from '../Action/Action';
import {ActionsQueue} from '../ActionsQueue';
import {BuildStep} from '../BuildStep';
import type {SheetInterface} from './SheetInterface';

export class Transaction<S extends SheetInterface = SheetInterface> {
	private readonly actionsQueue = new ActionsQueue();

	constructor(
		readonly sheet: S,
	) {}

	run(action: Action) {
		this.actionsQueue.enqueue(action);
		action.execute();
	}

	commit(): void {
		const buildSteps: BuildStep[] = [];
		while (this.actionsQueue.getSize() > 0) {
			const action = this.actionsQueue.dequeue();
			buildSteps.push(new BuildStep(action));
		}

		this.sheet.pushBuildSteps(...buildSteps);
	}
}
