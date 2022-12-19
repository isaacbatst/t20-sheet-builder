import type {Ability} from './Ability/Ability';
import type {Attributes} from './Attributes';
import {ProgressionStep} from './ProgressionStep';
import type {Race} from './Race';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import type {Skill} from './Skill/Skill';
import type {SkillName} from './Skill/SkillName';
import {StepType} from './StepDescriptionGenerator/StepDescriptionGenerator';

type CharacterParams = {
	initialAttributes: Attributes;
};

export class Character {
	readonly progressionSteps: ProgressionStep[] = [];
	private attributes: Attributes;
	private race?: Race;
	// eslint-disable-next-line @typescript-eslint/prefer-readonly
	private level = 1;
	private readonly abilities: Ability[] = [];
	private readonly skills: Record<SkillName, Skill>;

	constructor(
		params: CharacterParams,
	) {
		this.attributes = params.initialAttributes;
		this.progressionSteps.push(new ProgressionStep(StepType.initialAttributesDefinition, this));

		this.skills = InitialSkillsGenerator.generate(this);
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

	getLevel(): number {
		return this.level;
	}

	getAbilities() {
		return this.abilities;
	}

	getSkills() {
		return this.skills;
	}
}
