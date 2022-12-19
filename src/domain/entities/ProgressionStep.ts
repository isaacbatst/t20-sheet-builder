import type {CharacterInterface} from './CharacterInterface';
import {StepDescriptionGenerator} from './StepDescriptionGenerator/StepDescriptionGenerator';

export class ProgressionStep {
	readonly description: string;

	constructor(
		readonly step: string,
		character: CharacterInterface,
	) {
		this.description = StepDescriptionGenerator.generate(step, character);
	}
}
