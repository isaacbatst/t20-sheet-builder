import type {BuildStep, BuildStepInterface} from '../BuildStep';
import type {DefenseInterface} from '../Defense/DefenseInterface';
import type {Inventory} from '../Inventory/Inventory';
import type {OriginInterface} from '../Origin/Origin';
import type {LifePoints} from '../Points/LifePoints/LifePoints';
import type {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import type {RaceInterface} from '../Race/RaceInterface';
import type {RoleInterface} from '../Role/RoleInterface';
import type {SheetInterface} from '../Sheet/SheetInterface';
import type {Attributes} from './Attributes';
import type {Level} from './Levels';
import type {Proficiency} from './Proficiency';
import type {SheetAbilities, SheetLearnedCircles, SheetPowers, SheetSkills, SheetSpells} from './SheetBaseInterface';
import type {Vision} from './Vision';

type SheetParams = {
	attributes: Attributes;
	race: RaceInterface;
	role: RoleInterface;
	buildSteps: BuildStep[];
	lifePoints: LifePoints;
	manaPoints: ManaPoints;
	level: number;
	vision: Vision;
	displacement: number;
	defense: DefenseInterface;
	proficiencies: Proficiency[];
	abilities: SheetAbilities;
	powers: SheetPowers;
	learnedCircles: SheetLearnedCircles;
	spells: SheetSpells;
	skills: SheetSkills;
	inventory: Inventory;
	origin: OriginInterface;
	money: number;
};

export class Sheet implements SheetInterface {
	static readonly initialAttributes: Attributes = {strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0};
	readonly race: RaceInterface;
	readonly role: RoleInterface;
	readonly origin: OriginInterface;
	readonly buildSteps: BuildStepInterface[];
	readonly lifePoints: LifePoints;
	readonly manaPoints: ManaPoints;
	readonly learnedCircles: SheetLearnedCircles;
	readonly spells: SheetSpells;
	readonly attributes: Attributes;
	readonly level: Level;
	readonly vision: Vision;
	readonly displacement;
	readonly skills: SheetSkills;
	readonly defense: DefenseInterface;
	readonly proficiencies: Proficiency[];
	readonly abilities: SheetAbilities;
	readonly powers: SheetPowers;
	readonly inventory: Inventory;
	readonly money: number;

	constructor(
		params: SheetParams,
	) {
		this.skills = params.skills;
		this.race = params.race;
		this.role = params.role;
		this.attributes = params.attributes;
		this.lifePoints = params.lifePoints;
		this.manaPoints = params.manaPoints;
		this.level = params.level;
		this.vision = params.vision;
		this.displacement = params.displacement;
		this.defense = params.defense;
		this.buildSteps = params.buildSteps;
		this.proficiencies = params.proficiencies;
		this.abilities = params.abilities;
		this.powers = params.powers;
		this.learnedCircles = params.learnedCircles;
		this.spells = params.spells;
		this.inventory = params.inventory;
		this.origin = params.origin;
		this.money = params.money;
	}

	getRole() {
		return this.role;
	}

	getRace() {
		return this.race;
	}

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
