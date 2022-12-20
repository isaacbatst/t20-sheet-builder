import type {Action, CharacterAction} from './CharacterAction';
import type {ProgressionStepInterface} from './ProgressionStep';

export class ProgressionStepFake<T extends CharacterAction> implements ProgressionStepInterface {
	readonly description: string;

	constructor(
		readonly action: Action<T>,
	) {
		this.description = action.type;
	}
}
