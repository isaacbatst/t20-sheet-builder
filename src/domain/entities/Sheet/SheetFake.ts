import type {Attributes} from '../Attributes';
import type {Context} from '../Context';
import {Level} from '../Levels';
import type {BuildStepInterface} from '../ProgressionStep';
import type {SheetAbilities, SheetInterface, SheetPowers} from '../Sheet/SheetInterface';
import type {SkillName} from '../Skill/SkillName';
import {Vision} from '../Vision';

export class SheetFake implements SheetInterface {
	trainedSkills: SkillName[] = [];
	skillTotal = 0;
	skillTrainingPoints = 0;
	attributes: Attributes = {charisma: 0, constitution: 0, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0};
	buildSteps: BuildStepInterface[] = [];
	defenseTotal = 10;
	vision: Vision = Vision.default;
	abilities: SheetAbilities = {
		race: new Map(),
		role: new Map(),
	};

	powers: SheetPowers = {
		general: new Map(),
		role: new Map(),
	};

	level: Level = Level.levelOne;

	addSkillTemporaryModifier = jest.fn();
	addDefenseTemporaryModifier = jest.fn();
	useMana = jest.fn();
	addAttackTemporaryModifier = jest.fn();
	addDamageTemporaryModifier = jest.fn();

	getTrainedSkills(): SkillName[] {
		return this.trainedSkills;
	}

	getSkillTotal(skill: SkillName, context: Context): number {
		return this.skillTotal;
	}

	getSkillTrainingPoints(skill: SkillName): number {
		return this.skillTrainingPoints;
	}

	getAttributes(): Attributes {
		return this.attributes;
	}

	getDefenseTotal(context: Context): number {
		return this.defenseTotal;
	}

	getVision(): Vision {
		return this.vision;
	}

	getAbilities(): SheetAbilities {
		return this.abilities;
	}

	getPowers(): SheetPowers {
		return this.powers;
	}

	getLevel(): Level {
		return this.level;
	}
}
