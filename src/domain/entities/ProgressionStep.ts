import type {CharacterInterface} from './Character';
import {StepDescriptionGenerator} from './StepDescriptionGenerator/StepDescriptionGenerator';

export class ProgressionStep {
	readonly description: string;

	constructor(
		readonly stepType: string,
		character: CharacterInterface,
	) {
		this.description = StepDescriptionGenerator.generate(stepType, character);
	}
}
