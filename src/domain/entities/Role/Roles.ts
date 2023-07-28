import {type Proficiency} from '../Sheet';
import {type SkillName} from '../Skill';
import type {Static} from '../Static';
import {Arcanist} from './Arcanist';
import type {Role} from './Role';
import type {SelectSkillGroup} from './RoleInterface';
import type {RoleName} from './RoleName';
import {Warrior} from './Warrior';

export type RoleStatic<T extends Role = Role> = Static<T, {
	roleName: RoleName;
	selectSkillGroups: SelectSkillGroup[];
	initialLifePoints: number;
	lifePointsPerLevel: number;
	manaPerLevel: number;
	mandatorySkills: SkillName[];
	proficiencies: Proficiency[];
	startsWithArmor: boolean;
}>;

export abstract class Roles {
	static getAll(): RoleStatic[] {
		return [
			Arcanist,
			Warrior,
		];
	}
}
