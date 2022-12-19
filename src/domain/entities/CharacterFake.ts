import type {Attributes} from './Attributes';
import type {CharacterInterface} from './CharacterInterface';
import {ProgressionStep} from './ProgressionStep';
import {RaceFake} from './RaceFake';
import type {RaceInterface} from './RaceInterface';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import type {Skill} from './Skill/Skill';
import type {SkillNameEnum} from './Skill/SkillName';
import type {Step} from './StepDescriptionGenerator/StepDescriptionGenerator';

export class CharacterFake implements CharacterInterface {
	public level = 1;
	public attributes: Attributes = {
		charisma: 0,
		constitution: 0,
		dexterity: 0,
		intelligence: 0,
		strength: 0,
		wisdom: 0,
	};

	readonly progressionSteps: ProgressionStep[] = [];

	public defenseTotal = 10;
	public race = new RaceFake();
	public skills: Record<SkillNameEnum, Skill> = InitialSkillsGenerator.generate(this);

	private readonly trainedSkills: SkillNameEnum[] = [];
	private readonly defenseOtherModifiers: Array<{sourceName: string; value: number}> = [];

	saveStep(step: Step) {
		this.progressionSteps.push(new ProgressionStep(step, this));
	}

	getRace(): RaceInterface | undefined {
		return this.race;
	}

	getDefenseTotal(): number {
		return this.defenseTotal;
	}

	getTrainedSkills() {
		return this.trainedSkills;
	}

	trainSkill(name: SkillNameEnum): void {
		this.trainedSkills.push(name);
	}

	getLevel(): number {
		return this.level;
	}

	getSkills(): Record<SkillNameEnum, Skill> {
		return this.skills;
	}

	getAttributes(): Attributes {
		return this.attributes;
	}

	getDefenseOtherModifiers() {
		return this.defenseOtherModifiers;
	}

	addOtherModifierToDefense(sourceName: string, value: number): void {
		this.defenseOtherModifiers.push({sourceName, value});
	}

	addOtherModifierToSkill(sourceName: string, value: number, skill: SkillNameEnum): void {
		this.skills[skill].modifierOthers.addOtherModifier({sourceName, value});
	}
}
