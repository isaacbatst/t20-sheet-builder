import type {BuildStepInterface} from './BuildStep';
import {type SerializedSheetBuildStep} from './Sheet';
import type {ActionInterface, ActionType} from './Sheet/SheetActions';

export class ProgressionStepFake<T extends ActionType> implements BuildStepInterface<T> {
	readonly description: string;

	constructor(
		readonly action: ActionInterface<T>,
	) {
		this.description = action.type;
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
