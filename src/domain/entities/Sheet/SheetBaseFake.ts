import type {Attributes} from './Attributes';
import {DefenseFake} from '../Defense/DefenseFake';
import type {DefenseInterface} from '../Defense/DefenseInterface';
import {Level} from './Levels';
import type {Proficiency} from './Proficiency';
import type {BuildStepInterface} from '../BuildStep';
import {InitialSkillsGenerator} from '../Skill/InitialSkillsGenerator';
import {Vision} from './Vision';
import type {ActionsHandler} from './SheetActions';
import type {SheetAbilities, SheetBaseInterface, SheetLearnedCircles, SheetPowers, SheetSkills, SheetSpells, SheetTriggeredEffects} from './SheetBaseInterface';
import type {Equipment} from '../Inventory/Equipment/Equipment';
import {LifePoints} from '../Points/LifePoints/LifePoints';
import {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import {Inventory} from '../Inventory/Inventory';

export class SheetBaseFake implements SheetBaseInterface {
	actionHandlers: ActionsHandler = {
		setInitialAttributes: jest.fn(),
		chooseRace: jest.fn(),
		trainSkill: jest.fn(),
		changeVision: jest.fn(),
		applyRaceModifiers: jest.fn(),
		applyRaceAbility: jest.fn(),
		applyRoleAbility: jest.fn(),
		pickGeneralPower: jest.fn(),
		pickRolePower: jest.fn(),
		changeDisplacement: jest.fn(),
		chooseRole: jest.fn(),
		addProficiency: jest.fn(),
		learnCircle: jest.fn(),
		learnSpell: jest.fn(),
		addContextualModifierToSkill: jest.fn(),
		addFixedModifierToSkill: jest.fn(),
		addFixedModifierToLifePoints: jest.fn(),
		addPerLevelModifierToLifePoints: jest.fn(),
		addPerLevelModifierToManaPoints: jest.fn(),
		addFixedModifierToDefense: jest.fn(),
		trainIntelligenceSkills: jest.fn(),
		addEquipment: jest.fn(),
		pickOriginPower: jest.fn(),
		chooseOrigin: jest.fn(),
		addInitialEquipment: jest.fn(),
	};

	dispatch = jest.fn();
	initTransaction = jest.fn();
	buildSteps: BuildStepInterface[] = [];
	attributes: Attributes = {charisma: 0, constitution: 0, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0};
	defense = new DefenseFake();
	displacement = 9;
	level = Level.levelOne;
	skills: SheetSkills = InitialSkillsGenerator.generate();
	vision = Vision.default;
	proficiencies: Proficiency[] = [];
	abilities: SheetAbilities = {race: new Map(), role: new Map()};
	powers: SheetPowers = {general: new Map(), role: new Map(), origin: new Map()};
	spells: SheetSpells = new Map();
	learnedCircles: SheetLearnedCircles = {arcane: new Set(), divine: new Set()};
	lifePoints = new LifePoints();
	manaPoints = new ManaPoints();
	inventory = new Inventory();

	getAttributes(): Attributes {
		return this.attributes;
	}

	getDefense(): DefenseInterface {
		return this.defense;
	}

	getDisplacement(): number {
		return this.displacement;
	}

	getLevel(): number {
		return this.level;
	}

	getSkills(): SheetSkills {
		return this.skills;
	}

	getVision(): Vision {
		return this.vision;
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

	getSpells(): SheetSpells {
		return this.spells;
	}

	getLearnedCircles(): SheetLearnedCircles {
		return this.learnedCircles;
	}

	getLifePoints(): LifePoints {
		return this.lifePoints;
	}

	getManaPoints(): ManaPoints {
		return this.manaPoints;
	}

	getInventory(): Inventory {
		return this.inventory;
	}
}
