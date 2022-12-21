import type {ActionInterface, ActionType} from './SheetActions';
import type {ProgressionStepInterface} from './ProgressionStep';

export class ProgressionStepFake<T extends ActionType> implements ProgressionStepInterface<T> {
	readonly description: string;

	constructor(
		readonly action: ActionInterface<T>,
	) {
		this.description = action.type;
	}
}
