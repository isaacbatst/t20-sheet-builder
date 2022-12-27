import type {Attributes} from '../Attributes';
import type {Context} from '../Context';
import type {ContextInterface} from '../ContextInterface';
import type {DefenseInterface} from '../Defense/DefenseInterface';
import type {Level} from '../Levels';
import type {ContextualModifierInterface} from '../Modifier/ContextualModifier/ContextualModifierInterface';
import type {ModifierInterface} from '../Modifier/ModifierInterface';
import type {TemporaryModifierInterface} from '../Modifier/TemporaryModifier/TemporaryModifierInterface';
import type {LifePoints} from '../Points/LifePoints/LifePoints';
import type {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import type {PointsMaxCalculatorInterface} from '../Points/PointsMaxCalculator';
import type {Proficiency} from '../Proficiency';
import type {BuildStep, BuildStepInterface} from '../ProgressionStep';
import type {RaceInterface} from '../RaceInterface';
import type {RoleInterface} from '../Role/RoleInterface';
import type {SheetInterface} from '../Sheet/SheetInterface';
import type {SkillName} from '../Skill/SkillName';
import type {Vision} from '../Vision';
import {SheetBase} from './SheetBase';
import type {SheetAbilities, SheetLearnedCircles, SheetPowers, SheetSkills, SheetSpells, SheetTriggeredEffects} from './SheetBaseInterface';

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
	triggeredEffects: SheetTriggeredEffects;
	spells: SheetSpells;
	skills: SheetSkills;
};

export class Sheet extends SheetBase implements SheetInterface {
	static readonly initialAttributes: Attributes = {strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0};
	override readonly race: RaceInterface;
	override readonly role: RoleInterface;
	readonly buildSteps: BuildStepInterface[];
	readonly lifePoints: LifePoints;
	readonly manaPoints: ManaPoints;
	readonly learnedCircles: SheetLearnedCircles;
	readonly triggeredEffects: SheetTriggeredEffects;
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
	readonly attackModifiers: ModifierInterface[] = [];
	readonly damageModifiers: ModifierInterface[] = [];

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
		this.triggeredEffects = params.triggeredEffects;
		this.spells = params.spells;
	}

	getLifePoints(): LifePoints {
		return this.lifePoints;
	}

	getManaPoints(): ManaPoints {
		return this.manaPoints;
	}

	addAttackTemporaryModifier(modifier: TemporaryModifierInterface): void {
		this.attackModifiers.push(modifier);
	}

	addDamageTemporaryModifier(modifier: TemporaryModifierInterface): void {
		this.damageModifiers.push(modifier);
	}

	addSkillTemporaryModifier(skill: SkillName, modifier: TemporaryModifierInterface): void {
		throw new Error('Not implemented');
	}

	addDefenseTemporaryModifier(modifier: TemporaryModifierInterface): void {
		throw new Error('Not implemented');
	}

	setAttackTemporaryModifier(modifier: TemporaryModifierInterface): void {
		this.attackModifiers.push(modifier);
	}

	setDamageTemporaryModifier(modifier: TemporaryModifierInterface): void {
		this.damageModifiers.push(modifier);
	}

	useMana(value: number): void {
		this.manaPoints.consume(value);
	}

	getRole() {
		return this.role;
	}

	getRace() {
		return this.race;
	}
}
