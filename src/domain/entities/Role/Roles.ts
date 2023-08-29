import {type Proficiency} from '../Sheet';
import {type SkillName} from '../Skill';
import type {Static} from '../Static';
import {Arcanist} from './Arcanist';
import {Barbarian} from './Barbarian/Barbarian';
import {Bard} from './Bard';
import {Buccaneer} from './Buccaneer/Buccaneer';
import {Cleric} from './Cleric';
import {Druid} from './Druid';
import {Fighter} from './Fighter';
import {Inventor} from './Inventor';
import {Knight} from './Knight';
import {Noble} from './Noble';
import {Paladin} from './Paladin';
import {Ranger} from './Ranger';
import {Rogue} from './Rogue';
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
		[RoleName.bard]: Bard,
		[RoleName.ranger]: Ranger,
		[RoleName.knight]: Knight,
		[RoleName.cleric]: Cleric,
		[RoleName.druid]: Druid,
		[RoleName.inventor]: Inventor,
		[RoleName.rogue]: Rogue,
		[RoleName.fighter]: Fighter,
		[RoleName.noble]: Noble,
		[RoleName.paladin]: Paladin,
	};

	static getAll(): RoleStatic[] {
		return Object.values(Roles.map);
	}

	static get(roleName: RoleName): RoleStatic {
		return Roles.map[roleName];
	}
}
