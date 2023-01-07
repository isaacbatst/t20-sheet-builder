import {Arcanist} from './Arcanist';
import type {SelectSkillGroup} from './RoleInterface';
import type {RoleName} from './RoleName';
import {Warrior} from './Warrior';

export type RoleStatic = {
	roleName: RoleName;
	selectSkillGroups: SelectSkillGroup[];
};

export abstract class Roles {
	static getAll(): RoleStatic[] {
		return [
			Arcanist,
			Warrior,
		];
	}
}
