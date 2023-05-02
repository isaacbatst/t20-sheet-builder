import type {BuildStepInterface} from '../BuildStep';
import {DefenseFake} from '../Defense/DefenseFake';
import type {DefenseInterface} from '../Defense/DefenseInterface';
import {Inventory} from '../Inventory/Inventory';
import {LifePoints} from '../Points/LifePoints/LifePoints';
import {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import {InitialSkillsGenerator} from '../Skill/InitialSkillsGenerator';
import type {Attributes} from './Attributes';
import {Level} from './Levels';
import type {Proficiency} from './Proficiency';
import type {ActionsHandler} from './SheetActions';
import type {SheetAbilities, SheetBaseInterface, SheetLearnedCircles, SheetPowers, SheetSkills, SheetSpells} from './SheetBaseInterface';
import {Vision} from './Vision';
import {vi} from 'vitest';

export class SheetBaseFake implements SheetBaseInterface {
	actionHandlers: ActionsHandler = {
		setInitialAttributes: vi.fn(),
		chooseRace: vi.fn(),
		trainSkill: vi.fn(),
		changeVision: vi.fn(),
		applyRaceModifiers: vi.fn(),
		applyRaceAbility: vi.fn(),
		applyRoleAbility: vi.fn(),
		pickGeneralPower: vi.fn(),
		pickRolePower: vi.fn(),
		changeDisplacement: vi.fn(),
		chooseRole: vi.fn(),
		addProficiency: vi.fn(),
		learnCircle: vi.fn(),
		learnSpell: vi.fn(),
		addContextualModifierToSkill: vi.fn(),
		addFixedModifierToSkill: vi.fn(),
		addFixedModifierToLifePoints: vi.fn(),
		addPerLevelModifierToLifePoints: vi.fn(),
		addPerLevelModifierToManaPoints: vi.fn(),
		addFixedModifierToDefense: vi.fn(),
		trainIntelligenceSkills: vi.fn(),
		addEquipment: vi.fn(),
		pickOriginPower: vi.fn(),
		chooseOrigin: vi.fn(),
		addMoney: vi.fn(),
		addInitialEquipment: vi.fn(),
	};

	dispatch = vi.fn();
	initTransaction = vi.fn();
	money = 0;
	buildSteps: BuildStepInterface[] = [];
	attributes: Attributes = {charisma: 0, constitution: 0, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0};
	defense = new DefenseFake();
	displacement = 9;
	level = Level.one;
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

	getMoney(): number {
		return this.money;
	}
}
