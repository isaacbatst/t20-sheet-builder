import type {Attributes} from './Attributes';
import {ProgressionStep} from './ProgressionStep';
import type {Race} from './Race';
import {StepType} from './StepDescriptionGenerator/StepDescriptionGenerator';

type CharacterParams = {
	initialAttributes: Attributes;
};

export class Character {
	readonly progressionSteps: ProgressionStep[] = [];
	private attributes: Attributes;
	private race?: Race;

	constructor(
		params: CharacterParams,
	) {
		this.attributes = params.initialAttributes;
		this.progressionSteps.push(new ProgressionStep(StepType.initialAttributesDefinition, this));
	}

	chooseRace(race: Race) {
		this.race = race;
		this.attributes = this.race.applyAttributesModifiers(this.attributes);
		this.progressionSteps.push(new ProgressionStep(StepType.raceAttributesModifiersAppliance, this));
	}

	getAttributes(): Attributes {
		return this.attributes;
	}

	getRace(): Race | undefined {
		return this.race;
	}
}
