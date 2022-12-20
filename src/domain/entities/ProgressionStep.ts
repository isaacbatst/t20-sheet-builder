import type {Action, CharacterAction} from './CharacterAction';
import type {CharacterInterface} from './CharacterInterface';
import {StepDescriptionGenerator} from './StepDescriptionGenerator/StepDescriptionGenerator';

export class ProgressionStep<T extends CharacterAction> {
	readonly description: string;

	constructor(
		readonly action: Action<T>,
		character: CharacterInterface,
	) {
		this.description = StepDescriptionGenerator.generate(action, character);
	}
}
