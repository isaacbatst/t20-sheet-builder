import type {ActionInterface, ActionType} from './CharacterAction';
import type {CharacterInterface} from './CharacterInterface';
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
		character: CharacterInterface,
	) {
		this.description = ActionDescriptionGenerator.generate(character, action);
	}
}
