import {vi} from 'vitest';
import {Level} from '../Sheet';
import type {Proficiency} from '../Sheet/Proficiency';
import type {SkillName} from '../Skill/SkillName';
import type {RoleInterface, SelectSkillGroup} from './RoleInterface';
import {RoleName} from './RoleName';
import {type SerializedRole, type SerializedRoles} from './SerializedRole';

export class RoleFake implements RoleInterface {
	chosenSkills: SkillName[] = [];
	abilitiesPerLevel = {
		[Level.one]: {},
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

	initialLifePoints = 10;
	lifePointsPerLevel = 5;
	manaPerLevel = 5;
	mandatorySkills: SkillName[] = [];
	selectSkillGroups: SelectSkillGroup[] = [];
	proficiencies: Proficiency[] = [];
	name: RoleName = RoleName.warrior;
	startsWithArmor = true;
	getTotalInitialSkills = vi.fn(() => 5);
	addToSheet = vi.fn();
	serialize = vi.fn();
}
