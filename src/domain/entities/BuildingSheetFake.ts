import type {Attributes} from './Attributes';
import {OutGameContext} from './BuildingSheetContext';
import type {BuildingSheetInterface, DefenseInterface} from './BuildingSheetInterface';
import type {Context} from './Context';
import {DefenseFake} from './DefenseFake';
import {LifePoints} from './LifePoints';
import {ManaPoints} from './ManaPoints';
import type {ModifierInterface} from './ModifierList';
import type {Proficiency} from './Proficiency';
import type {ProgressionStepFake} from './ProgressionStepFake';
import {RaceFake} from './RaceFake';
import type {RaceInterface} from './RaceInterface';
import type {ActionsHandler, ActionType} from './Sheet/SheetActions';
import type {SheetAbilities, SheetPowers} from './Sheet/SheetInterface';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import type {Skill} from './Skill/Skill';
import type {SkillName} from './Skill/SkillName';
import {Vision} from './Vision';

export class BuildingSheetFake implements BuildingSheetInterface {
	actionHandlers: ActionsHandler = {
		addOtherModifierToDefense: jest.fn(),
		addOtherModifierToSkill: jest.fn(),
		chooseRace: jest.fn(),
		trainSkill: jest.fn(),
		changeVision: jest.fn(),
		setInitialAttributes: jest.fn(),
		applyRaceModifiers: jest.fn(),
		applyRaceAbility: jest.fn(),
		pickGeneralPower: jest.fn(),
		pickRolePower: jest.fn(),
		changeDisplacement: jest.fn(),
		addModifierToLifePoints: jest.fn(),
		chooseRole: jest.fn(),
		addProficiency: jest.fn(),
		applyRoleAbility: jest.fn(),
		learnCircle: jest.fn(),
		learnSpell: jest.fn(),
		addTriggeredEffect: jest.fn(),
		addPerLevelModifierToLifePoints: jest.fn(),
	};

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
	public proficiencies: Proficiency[] = [];
	public abilities: SheetAbilities = {race: new Map(), role: new Map()};
	public powers: SheetPowers = {general: new Map(), role: new Map()};
	public manaPoints = new ManaPoints();

	private readonly trainedSkills: SkillName[] = [];
	private readonly defenseOtherModifiers: ModifierInterface[] = [];

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
		return this.skills[skill].getSkillTrainingPoints(this.level);
	}

	getProficiencies(): Proficiency[] {
		return this.proficiencies;
	}

	getAbilities(): SheetAbilities {
		return this.abilities;
	}

	getPowers(): SheetPowers {
		return this.powers;
	}

	getManaPoints(): ManaPoints {
		return this.manaPoints;
	}
}
