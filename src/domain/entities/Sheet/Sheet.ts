import type {Attack} from '../Attack/Attack';
import {WeaponAttack} from '../Attack/WeaponAttack';
import type {BuildStep, BuildStepInterface} from '../BuildStep';
import type {DefenseInterface} from '../Defense/DefenseInterface';
import {OffensiveWeapon} from '../Inventory/Equipment/Weapon/OfensiveWeapon/OffensiveWeapon';
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
import {SheetBase} from './SheetBase';
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

export class Sheet extends SheetBase implements SheetInterface {
	static readonly initialAttributes: Attributes = {strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0};
	override readonly race: RaceInterface;
	override readonly role: RoleInterface;
	override readonly origin: OriginInterface;
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
		super();
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

	getAttacks() {
		const attacks: Attack[] = [];

		this.inventory.equipments.forEach(equipment => {
			if (equipment instanceof OffensiveWeapon) {
				const attack = new WeaponAttack(equipment);
				attacks.push(attack);
			}
		});

		return attacks;
	}
}
