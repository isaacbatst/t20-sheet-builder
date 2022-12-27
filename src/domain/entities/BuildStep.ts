import {ActionDescriptionGenerator} from './ActionDescriptionGenerator/ActionDescriptionGenerator';
import type {ActionInterface, ActionType} from './Sheet/SheetActions';
import type {SheetBaseInterface} from './Sheet/SheetBaseInterface';

export type BuildStepInterface<T extends ActionType = ActionType> = {
	description: string;
	action: ActionInterface<T>;
};

export class BuildStep<T extends ActionType = ActionType> implements BuildStepInterface<T> {
	readonly description: string;

	constructor(
		readonly action: ActionInterface<T>,
		sheet: SheetBaseInterface,
	) {
		this.description = ActionDescriptionGenerator.generate(sheet, action);
	}
}
