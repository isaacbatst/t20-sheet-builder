import type {Attributes} from './Attributes';
import type {DefenseInterface} from './BuildingSheetInterface';
import type {Context, ContextInterface} from './Context';
import type {LifePoints} from './LifePoints';
import type {Proficiency} from './Proficiency';
import type {BuildStep, BuildStepInterface} from './ProgressionStep';
import type {RaceInterface} from './RaceInterface';
import type {RoleInterface} from './Role/RoleInterface';
import type {SheetAbilities, SheetInterface, SheetPowers} from './SheetInterface';
import type {Skill} from './Skill/Skill';
import type {SkillName} from './Skill/SkillName';
import type {Vision} from './Vision';

export type SheetSkills = Record<SkillName, Skill>;

type SheetParams = {
	attributes: Attributes;
	race: RaceInterface;
	role: RoleInterface;
	skills: SheetSkills;
	buildSteps: BuildStep[];
	lifePoints: LifePoints;
	level: number;
	vision: Vision;
	displacement: number;
	defense: DefenseInterface;
	proficiencies: Proficiency[];
	abilities: SheetAbilities;
	powers: SheetPowers;
};

export class Sheet implements SheetInterface {
	static readonly initialAttributes: Attributes = {strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0};
	readonly buildSteps: BuildStepInterface[];
	readonly lifePoints: LifePoints;
	private readonly race: RaceInterface;
	private readonly role: RoleInterface;
	private readonly attributes: Attributes;
	private readonly level: number;
	private readonly vision: Vision;
	private readonly displacement;
	private readonly skills: SheetSkills;
	private readonly defense: DefenseInterface;
	private readonly proficiencies: Proficiency[];
	private readonly abilities: SheetAbilities;
	private readonly powers: SheetPowers;

	constructor(
		params: SheetParams,
	) {
		this.skills = params.skills;
		this.race = params.race;
		this.role = params.role;
		this.attributes = params.attributes;
		this.lifePoints = params.lifePoints;
		this.level = params.level;
		this.vision = params.vision;
		this.displacement = params.displacement;
		this.defense = params.defense;
		this.buildSteps = params.buildSteps;
		this.proficiencies = params.proficiencies;
		this.abilities = params.abilities;
		this.powers = params.powers;
	}

	getDisplacement() {
		return this.displacement;
	}

	getVision(): Vision {
		return this.vision;
	}

	getDefenseTotal(context: Context): number {
		return this.defense.getTotal(this.attributes.dexterity, 0, 0, context);
	}

	getAttributes(): Attributes {
		return this.attributes;
	}

	getAbilities(): SheetAbilities {
		return this.abilities;
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

	getProficiencies() {
		return this.proficiencies;
	}

	getRole() {
		return this.role;
	}

	getRace() {
		return this.race;
	}

	getPowers(): SheetPowers {
		return this.powers;
	}
}
