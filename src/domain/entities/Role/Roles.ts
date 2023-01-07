import {Arcanist} from './Arcanist';
import type {SelectSkillGroup} from './RoleInterface';
import type {RoleName} from './RoleName';
import {Warrior} from './Warrior';

export abstract class Roles {
	static getAll(): Array<{roleName: RoleName; selectSkillGroups: SelectSkillGroup[]}> {
		return [
			Arcanist,
			Warrior,
		];
	}
}
