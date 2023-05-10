import {Level} from '../../Sheet/Level';
import {Proficiency} from '../../Sheet/Proficiency';
import {SkillName} from '../../Skill/SkillName';
import {Role} from '../Role';
import type {RoleAbility} from '../RoleAbility';
import type {SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {SpecialAttack} from './SpecialAttack/SpecialAttack';

export class Warrior extends Role {
	static readonly roleName = RoleName.warrior;
	static readonly selectSkillGroups: SelectSkillGroup[] = [
		{amount: 1, skills: [SkillName.fight, SkillName.aim]},
		{amount: 2, skills: [SkillName.animalHandling, SkillName.athletics, SkillName.animalRide, SkillName.war, SkillName.initiative, SkillName.intimidation, SkillName.fight, SkillName.craft, SkillName.perception, SkillName.aim, SkillName.reflexes]},
	];

	get initialLifePoints() {
		return 20;
	}

	get lifePointsPerLevel() {
		return 5;
	}

	get manaPerLevel() {
		return 3;
	}

	readonly mandatorySkills: SkillName[] = [SkillName.fortitude];
	readonly proficiencies: Proficiency[] = [Proficiency.martial, Proficiency.shield, Proficiency.heavyArmor];
	readonly name: RoleName = RoleName.warrior;
	readonly abilitiesPerLevel: Record<Level, Record<string, RoleAbility>> = {
		[Level.one]: {
			specialAttack: new SpecialAttack(),
		},
		[Level.two]: {},
		[Level.three]: {},
		[Level.four]: {},
		[Level.five]: {},
		[Level.six]: {},
		[Level.seven]: {},
		[Level.eight]: {},
		[Level.nine]: {},
		[Level.ten]: {},
	};

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Warrior.selectSkillGroups);
	}
}
