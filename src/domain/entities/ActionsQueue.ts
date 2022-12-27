import type {Queue} from './Queue';
import type {ActionInterface} from './Sheet/SheetActions';

export class ActionsQueue implements Queue<ActionInterface> {
	items: ActionInterface[] = [];

	enqueue(item: ActionInterface): void {
		this.items.push(item);
	}

	dequeue(): ActionInterface {
		const item = this.items.shift();

		if (!item) {
			throw new Error('EMPTY_QUEUE');
		}

		return item;
	}

	getSize(): number {
		return this.items.length;
	}
}
