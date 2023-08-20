import {type SerializedSheetBuildStep} from './Sheet/SerializedSheet/SerializedSheetInterface';
import type {ActionInterface, ActionType} from './Sheet/SheetActions';

export type BuildStepInterface<T extends ActionType = ActionType> = {
	action: ActionInterface<T>;
	serialize(): SerializedSheetBuildStep;
};

export class BuildStep<T extends ActionType = ActionType> implements BuildStepInterface<T> {
	constructor(
		readonly action: ActionInterface<T>,
	) {
	}

	serialize(): SerializedSheetBuildStep {
		return {
			action: {
				type: this.action.type,
				description: this.action.description,
			},
		};
	}
}
