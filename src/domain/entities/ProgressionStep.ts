import type {Action, CharacterAction} from './CharacterAction';
import type {CharacterInterface} from './CharacterInterface';
import {ActionDescriptionGenerator} from './ActionDescriptionGenerator/ActionDescriptionGenerator';

export type ProgressionStepInterface = {
	description: string;
};

export class ProgressionStep<T extends CharacterAction> implements ProgressionStepInterface {
	readonly description: string;

	constructor(
		readonly action: Action<T>,
		character: CharacterInterface,
	) {
		this.description = ActionDescriptionGenerator.generate(character, action);
	}
}
