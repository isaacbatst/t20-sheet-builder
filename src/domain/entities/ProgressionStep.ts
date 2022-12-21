import type {ActionInterface, ActionType} from './SheetActions';
import type {SheetInterface} from './SheetInterface';
import {ActionDescriptionGenerator} from './ActionDescriptionGenerator/ActionDescriptionGenerator';
import type {Action} from './Action/Action';

export type ProgressionStepInterface<T extends ActionType> = {
	description: string;
	action: Action<T>;
};

export class ProgressionStep<T extends ActionType> implements ProgressionStepInterface<T> {
	readonly description: string;

	constructor(
		readonly action: ActionInterface<T>,
		sheet: SheetInterface,
	) {
		this.description = ActionDescriptionGenerator.generate(sheet, action);
	}
}
