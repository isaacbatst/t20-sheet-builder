import type {Attributes} from './Attributes';
import {ProgressionStep} from './ProgressionStep';
import type {Race} from './Race';
import {StepType} from './StepDescriptionGenerator';

type CharacterParams = {
	initialAttributes: Attributes;
	race: Race;
};

export class Character {
	readonly attributes: Attributes;
	readonly race: Race;
	readonly progressionSteps: ProgressionStep[] = [];

	constructor(
		params: CharacterParams,
	) {
		this.attributes = params.initialAttributes;
		this.progressionSteps.push(new ProgressionStep(StepType.initialAttributesDefinition, this));

		this.race = params.race;
		this.attributes = this.race.applyAttributesModifiers(this.attributes);
		this.progressionSteps.push(new ProgressionStep(StepType.raceAttributesModifiersAppliance, this));
	}
}
