import type {BuildStepInterface} from './ProgressionStep';
import type {ActionInterface, ActionType} from './Sheet/SheetActions';

export class ProgressionStepFake<T extends ActionType> implements BuildStepInterface<T> {
	readonly description: string;

	constructor(
		readonly action: ActionInterface<T>,
	) {
		this.description = action.type;
	}
}
