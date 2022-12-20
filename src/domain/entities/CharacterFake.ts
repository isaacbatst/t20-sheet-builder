import type {Attributes} from './Attributes';
import {BuildContext} from './BuildContext';
import type {CharacterInterface, OtherModifierCondition} from './CharacterInterface';
import type {Context} from './Context';
import type {Modifier} from './ModifierOthers';
import {ProgressionStep} from './ProgressionStep';
import {RaceFake} from './RaceFake';
import type {RaceInterface} from './RaceInterface';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import type {Skill} from './Skill/Skill';
import type {SkillNameEnum} from './Skill/SkillName';
import type {Step} from './StepDescriptionGenerator/StepDescriptionGenerator';
import {Vision} from './Vision';

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

	public vision: Vision = Vision.default;
	public context: Context = new BuildContext();

	readonly progressionSteps: ProgressionStep[] = [];

	public defenseTotal = 10;
	public race = new RaceFake();
	public skills: Record<SkillNameEnum, Skill> = InitialSkillsGenerator.generate(this);

	private readonly trainedSkills: SkillNameEnum[] = [];
	private readonly defenseOtherModifiers: Modifier[] = [];

	saveStep(step: Step) {
		this.progressionSteps.push(new ProgressionStep(step, this));
	}

	trainSkill(name: SkillNameEnum): void {
		this.trainedSkills.push(name);
	}

	addOtherModifierToDefense(sourceName: string, value: number, condition?: OtherModifierCondition): void {
		this.defenseOtherModifiers.push({sourceName, value, condition});
	}

	addOtherModifierToSkill(sourceName: string, value: number, skill: SkillNameEnum, condition?: OtherModifierCondition): void {
		this.skills[skill].modifierOthers.add({sourceName, value, condition});
	}

	setVision(vision: Vision): void {
		this.vision = vision;
	}

	getRace(): RaceInterface | undefined {
		return this.race;
	}

	getContext(): Context {
		return this.context;
	}

	getVision(): Vision {
		return this.vision;
	}

	getDefenseTotal(): number {
		return this.defenseTotal;
	}

	getTrainedSkills() {
		return this.trainedSkills;
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
}
