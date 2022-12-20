import type {Attributes} from './Attributes';
import {BuildContext} from './BuildContext';
import type {CharacterInterface, OtherModifierCondition} from './CharacterInterface';
import type {Context} from './Context';
import {Defense} from './Defense';
import {ProgressionStep} from './ProgressionStep';
import type {RaceInterface} from './RaceInterface';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import type {Skill} from './Skill/Skill';
import type {SkillNameEnum} from './Skill/SkillName';
import {SkillName} from './Skill/SkillName';
import {Step} from './StepDescriptionGenerator/StepDescriptionGenerator';
import {Vision} from './Vision';

type CharacterParams = {
	initialAttributes: Attributes;
	context?: Context;
};

export class Character implements CharacterInterface {
	readonly progressionSteps: ProgressionStep[] = [];
	private attributes: Attributes;
	private race?: RaceInterface;
	// eslint-disable-next-line @typescript-eslint/prefer-readonly
	private level = 1;
	private vision: Vision = Vision.default;
	private readonly defense = new Defense();
	private readonly skills: Record<SkillNameEnum, Skill>;
	private readonly context: Context;

	constructor(
		params: CharacterParams,
	) {
		this.attributes = params.initialAttributes;
		this.context = params.context ?? new BuildContext();
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

	addOtherModifierToDefense(sourceName: string, value: number, condition?: OtherModifierCondition) {
		this.defense.modifierOthers.add({sourceName, value, condition});
	}

	addOtherModifierToSkill(sourceName: string, value: number, skill: SkillNameEnum, condition?: OtherModifierCondition): void {
		this.skills[skill].modifierOthers.add({sourceName, value, condition});
	}

	saveStep(step: Step): void {
		this.progressionSteps.push(new ProgressionStep(step, this));
	}

	setVision(vision: Vision): void {
		this.vision = vision;
	}

	getVision(): Vision {
		return this.vision;
	}

	getContext(): Context {
		return this.context;
	}

	getDefense(): Defense {
		return this.defense;
	}

	getDefenseTotal(): number {
		return this.defense.getTotal(this.attributes.dexterity, 0, 0, this.context);
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

	getSkillTotal(skill: SkillNameEnum) {
		return this.skills[skill].getTotal(this.level, this.context);
	}

	getTrainedSkills(): SkillNameEnum[] {
		return Object.values(this.skills)
			.filter(skill => skill.getIsTrained())
			.map(skill => skill.name.value);
	}
}
