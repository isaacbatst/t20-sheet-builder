import type {Character} from './Character';
import {StepDescriptionGenerator} from './StepDescriptionGenerator';

export class ProgressionStep {
	readonly description: string;

	constructor(
		readonly stepType: string,
		character: Character,
	) {
		this.description = StepDescriptionGenerator.generateDescription(stepType, character);
	}
}
