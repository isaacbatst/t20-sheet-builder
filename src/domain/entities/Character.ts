import type {Attributes} from './Attributes';
import type {CharacterInterface} from './CharacterInterface';
import {Defense} from './Defense';
import {ProgressionStep} from './ProgressionStep';
import type {RaceInterface} from './RaceInterface';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import type {Skill} from './Skill/Skill';
import type {SkillNameEnum} from './Skill/SkillName';
import {SkillName} from './Skill/SkillName';
import {Step} from './StepDescriptionGenerator/StepDescriptionGenerator';

type CharacterParams = {
	initialAttributes: Attributes;
};

export class Character implements CharacterInterface {
	readonly progressionSteps: ProgressionStep[] = [];
	private attributes: Attributes;
	private race?: RaceInterface;
	// eslint-disable-next-line @typescript-eslint/prefer-readonly
	private level = 1;
	private readonly skills: Record<SkillNameEnum, Skill>;
	private readonly defense = new Defense();

	constructor(
		params: CharacterParams,
	) {
		this.attributes = params.initialAttributes;
		this.progressionSteps.push(new ProgressionStep(Step.initialAttributesDefinition, this));

		this.skills = InitialSkillsGenerator.generate(this);
	}

	chooseRace(race: RaceInterface) {
		this.race = race;
		this.attributes = this.race.applyAttributesModifiers(this.attributes);
		this.progressionSteps.push(new ProgressionStep(Step.raceAttributesModifiersAppliance, this));

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

	saveStep(step: Step): void {
		this.progressionSteps.push(new ProgressionStep(step, this));
	}

	getDefense(): Defense {
		return this.defense;
	}

	getDefenseTotal(): number {
		return this.defense.getTotal(this.attributes.dexterity, 0, 0);
	}

	getAttributes(): Attributes {
		return this.attributes;
	}

	getRace(): RaceInterface | undefined {
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
