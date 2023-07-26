import {type Action} from './Action/Action';
import {SheetBuilderError} from '../errors/SheetBuilderError';
import type {Queue} from './Queue';

export class ActionsQueue implements Queue<Action> {
	items: Action[] = [];

	enqueue(item: Action): void {
		this.items.push(item);
	}

	dequeue(): Action {
		const item = this.items.shift();

		if (!item) {
			throw new SheetBuilderError('EMPTY_QUEUE');
		}

		return item;
	}

	getSize(): number {
		return this.items.length;
	}
}
