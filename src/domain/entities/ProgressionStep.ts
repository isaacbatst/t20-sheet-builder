import {ActionDescriptionGenerator} from './ActionDescriptionGenerator/ActionDescriptionGenerator';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import type {ActionType, ActionInterface} from './SheetActions';

export type BuildStepInterface<T extends ActionType = ActionType> = {
	description: string;
	action: ActionInterface<T>;
};

export class BuildStep<T extends ActionType = ActionType> implements BuildStepInterface<T> {
	readonly description: string;

	constructor(
		readonly action: ActionInterface<T>,
		sheet: BuildingSheetInterface,
	) {
		this.description = ActionDescriptionGenerator.generate(sheet, action);
	}
}
