import type {Character} from './Character';
import {StepDescriptionGenerator} from './StepDescriptionGenerator/StepDescriptionGenerator';

export class ProgressionStep {
	readonly description: string;

	constructor(
		readonly stepType: string,
		character: Character,
	) {
		this.description = StepDescriptionGenerator.generate(stepType, character);
	}
}
