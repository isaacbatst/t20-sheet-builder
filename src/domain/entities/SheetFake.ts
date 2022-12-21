import type {Attributes} from './Attributes';
import {BuildingSheetContext} from './BuildingSheetContext';
import type {Context} from './Context';
import type {ModifierInterface} from './ModifierList';
import {ProgressionStepFake} from './ProgressionStepFake';
import {RaceFake} from './RaceFake';
import type {RaceInterface} from './RaceInterface';
import type {ActionInterface, ActionType} from './SheetActions';
import type {SheetInterface} from './SheetInterface';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import type {Skill} from './Skill/Skill';
import type {SkillName} from './Skill/SkillName';
import {Vision} from './Vision';

export class SheetFake implements SheetInterface {
	public level = 1;
	public attributes: Attributes = {
		strength: 0,
		dexterity: 0,
		constitution: 0,
		intelligence: 0,
		wisdom: 0,
		charisma: 0,
	};

	public vision: Vision = Vision.default;
	public context: Context = new BuildingSheetContext();

	readonly progressionSteps: Array<ProgressionStepFake<ActionType>> = [];

	public defenseTotal = 10;
	public race = new RaceFake();
	public skills: Record<SkillName, Skill> = InitialSkillsGenerator.generate();

	dispatch = jest.fn(<T extends ActionType>(action: ActionInterface<T>) => {
		this.progressionSteps.push(new ProgressionStepFake(action));
	});

	private readonly trainedSkills: SkillName[] = [];
	private readonly defenseOtherModifiers: ModifierInterface[] = [];

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

	getSkills(): Record<SkillName, Skill> {
		return this.skills;
	}

	getAttributes(): Attributes {
		return this.attributes;
	}

	getDefenseOtherModifiers() {
		return this.defenseOtherModifiers;
	}

	getSkillTotal(skill: SkillName): number {
		return this.skills[skill].getTotal(this.attributes, this.level, this.context);
	}

	getSkillTrainingPoints(skill: SkillName): number {
		return this.skills[skill].getTrainingPoints(this.level);
	}

	private trainSkill(name: SkillName): void {
		this.trainedSkills.push(name);
	}

	private addOtherModifierToDefense(modifier: ModifierInterface): void {
		this.defenseOtherModifiers.push(modifier);
	}

	private addOtherModifierToSkill(modifier: ModifierInterface, skill: SkillName): void {
		this.skills[skill].addOtherModifier(modifier);
	}
}
