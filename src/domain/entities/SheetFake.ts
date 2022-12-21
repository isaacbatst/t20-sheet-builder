import type {Attributes} from './Attributes';
import {OutGameContext} from './BuildingSheetContext';
import type {BuildingSheetInterface, DefenseInterface} from './BuildingSheetInterface';
import type {Context} from './Context';
import type {Defense} from './Defense';
import {DefenseFake} from './DefenseFake';
import {LifePoints} from './LifePoints';
import type {ModifierInterface} from './ModifierList';
import {ProgressionStepFake} from './ProgressionStepFake';
import {RaceFake} from './RaceFake';
import type {RaceInterface} from './RaceInterface';
import type {ActionInterface, ActionType} from './SheetActions';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import type {Skill} from './Skill/Skill';
import type {SkillName} from './Skill/SkillName';
import {Vision} from './Vision';

export class BuildingSheetFake implements BuildingSheetInterface {
	public level = 1;
	public attributes: Attributes = {
		strength: 0,
		dexterity: 0,
		constitution: 0,
		intelligence: 0,
		wisdom: 0,
		charisma: 0,
	};

	public lifePoints = new LifePoints();

	public vision: Vision = Vision.default;
	public displacement = 9;
	public context: Context = new OutGameContext();

	readonly buildSteps: Array<ProgressionStepFake<ActionType>> = [];

	public defense = new DefenseFake();
	public race = new RaceFake();
	public skills: Record<SkillName, Skill> = InitialSkillsGenerator.generate();

	dispatch = jest.fn(<T extends ActionType>(action: ActionInterface<T>) => {
		this.buildSteps.push(new ProgressionStepFake(action));
	});

	private readonly trainedSkills: SkillName[] = [];
	private readonly defenseOtherModifiers: ModifierInterface[] = [];

	setVision(vision: Vision): void {
		this.vision = vision;
	}

	getDefense(): DefenseInterface {
		return this.defense;
	}

	getDisplacement(): number {
		return this.displacement;
	}

	getLifePoints(): LifePoints {
		return this.lifePoints;
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
