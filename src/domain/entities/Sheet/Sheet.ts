import type {Attributes} from '../Attributes';
import type {Context, ContextInterface} from '../Context';
import type {Level} from '../Levels';
import type {LifePoints} from '../LifePoints';
import type {ManaPoints} from '../ManaPoints';
import type {ModifierInterface, TemporaryModifierInterface} from '../ModifierList';
import type {Proficiency} from '../Proficiency';
import type {BuildStep, BuildStepInterface} from '../ProgressionStep';
import type {RaceInterface} from '../RaceInterface';
import type {RoleInterface} from '../Role/RoleInterface';
import type {SheetAbilities, SheetInterface, SheetPowers} from '../Sheet/SheetInterface';
import type {Skill} from '../Skill/Skill';
import type {SkillName} from '../Skill/SkillName';
import type {Vision} from '../Vision';
import type {DefenseInterface} from './BuildingSheetInterface';
import type {SheetLearnedCircles, SheetSpells, SheetTriggeredEffects} from './SheetBase';
import {SheetBase} from './SheetBase';

export type SheetSkills = Record<SkillName, Skill>;

type SheetParams = {
	attributes: Attributes;
	race: RaceInterface;
	role: RoleInterface;
	skills: SheetSkills;
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
};

export class Sheet extends SheetBase implements SheetInterface {
	static readonly initialAttributes: Attributes = {strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0};
	readonly buildSteps: BuildStepInterface[];
	readonly lifePoints: LifePoints;
	readonly manaPoints: ManaPoints;
	override readonly race: RaceInterface;
	override readonly role: RoleInterface;
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

	addAttackTemporaryModifier(modifier: TemporaryModifierInterface): void {
		this.attackModifiers.push(modifier);
	}

	addDamageTemporaryModifier(modifier: TemporaryModifierInterface): void {
		this.damageModifiers.push(modifier);
	}

	addSkillTemporaryModifier(skill: SkillName, modifier: TemporaryModifierInterface): void {
		this.skills[skill].addOtherModifier(modifier);
	}

	addDefenseTemporaryModifier(modifier: TemporaryModifierInterface): void {
		this.defense.others.add(modifier);
	}

	setAttackTemporaryModifier(modifier: TemporaryModifierInterface): void {
		this.attackModifiers.push(modifier);
	}

	setDamageTemporaryModifier(modifier: TemporaryModifierInterface): void {
		this.damageModifiers.push(modifier);
	}

	addDefenseModifier(modifier: ModifierInterface): void {
		this.defense.others.add(modifier);
	}

	useMana(value: number): void {
		this.manaPoints.setCurrent(value);
	}

	getDefenseTotal(context: Context): number {
		return this.defense.getTotal(this.attributes.dexterity, 0, 0, context);
	}

	getMaxLifePoints(context: ContextInterface) {
		return this.lifePoints.getMax({constitution: this.attributes.constitution, context, level: this.level, role: this.role});
	}

	getSkillTotal(skill: SkillName, context: Context) {
		return this.skills[skill].getTotal(this.attributes, this.level, context);
	}

	getTrainedSkills(): SkillName[] {
		return Object.entries(this.skills)
			.filter(([name, skill]) => skill.getIsTrained())
			.map(([name]) => name as SkillName);
	}

	getSkillTrainingPoints(skill: SkillName): number {
		return this.skills[skill].getSkillTrainingPoints(this.level);
	}

	getRole() {
		return this.role;
	}

	getRace() {
		return this.race;
	}
}
