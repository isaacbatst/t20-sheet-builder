import {type Proficiency} from '../Sheet';
import {type SkillName} from '../Skill';
import type {Static} from '../Static';
import {Arcanist} from './Arcanist';
import {Barbarian} from './Barbarian/Barbarian';
import {Buccaneer} from './Buccaneer/Buccaneer';
import type {Role} from './Role';
import type {SelectSkillGroup} from './RoleInterface';
import {RoleName} from './RoleName';
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
	static map: Record<RoleName, RoleStatic> = {
		[RoleName.arcanist]: Arcanist,
		[RoleName.warrior]: Warrior,
		[RoleName.barbarian]: Barbarian,
		[RoleName.buccaneer]: Buccaneer,
	};

	static getAll(): RoleStatic[] {
		return Object.values(Roles.map);
	}

	static get(roleName: RoleName): RoleStatic {
		return Roles.map[roleName];
	}
}
