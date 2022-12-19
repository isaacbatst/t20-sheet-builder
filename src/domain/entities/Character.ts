import type {Attributes} from './Attributes';
import {Defense} from './Defense';
import {ProgressionStep} from './ProgressionStep';
import type {Race} from './Race';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import type {Skill} from './Skill/Skill';
import type {SkillNameEnum} from './Skill/SkillName';
import {SkillName} from './Skill/SkillName';
import {StepType} from './StepDescriptionGenerator/StepDescriptionGenerator';

type CharacterParams = {
	initialAttributes: Attributes;
};

export type SkilledCharacter = {
	getTrainedSkills(): SkillNameEnum[];
	getSkills(): Record<SkillNameEnum, Skill>;
	trainSkill(name: string): void;
};

export type LeveledCharacter = {
	getLevel(): number;
};

export type AttributesCharacter = {
	getAttributes(): Attributes;
};

export type OtherModifierAdderCharacter = {
	addOtherModifierToDefense(sourceName: string, modifier: number): void;
	addOtherModifierToSkill(sourceName: string, modifier: number, skill: SkillNameEnum): void;
};

export type CharacterInterface = SkilledCharacter
& LeveledCharacter
& AttributesCharacter
& OtherModifierAdderCharacter;

export class Character implements CharacterInterface {
	readonly progressionSteps: ProgressionStep[] = [];
	private attributes: Attributes;
	private race?: Race;
	// eslint-disable-next-line @typescript-eslint/prefer-readonly
	private level = 1;
	private readonly skills: Record<SkillNameEnum, Skill>;
	private readonly defense = new Defense();

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

		this.race.applyAbilities(this);
	}

	trainSkill(name: string): void {
		const skillName = new SkillName(name);
		const skill = this.skills[skillName.value];
		skill.train();
	}

	addOtherModifierToDefense(sourceName: string, value: number) {
		this.defense.modifierOthers.addOtherModifier({sourceName, value});
	}

	addOtherModifierToSkill(sourceName: string, value: number, skill: SkillNameEnum): void {
		this.skills[skill].modifierOthers.addOtherModifier({sourceName, value});
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

	getSkills() {
		return this.skills;
	}

	getTrainedSkills(): SkillNameEnum[] {
		return Object.values(this.skills)
			.filter(skill => skill.getIsTrained())
			.map(skill => skill.name.value);
	}
}
