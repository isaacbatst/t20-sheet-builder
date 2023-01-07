import type {Proficiency} from '../Sheet/Proficiency';
import type {SelectSkillGroup, RoleInterface} from './RoleInterface';
import {RoleName} from './RoleName';
import type {SkillName} from '../Skill/SkillName';

export class RoleFake implements RoleInterface {
	initialLifePoints = 10;
	lifePointsPerLevel = 5;
	manaPerLevel = 5;
	mandatorySkills: SkillName[] = [];
	selectSkillGroups: SelectSkillGroup[] = [];
	proficiencies: Proficiency[] = [];
	name: RoleName = RoleName.warrior;
	startsWithArmor = true;
	getTotalInitialSkills = jest.fn(() => 5);
	addToSheet = jest.fn();
}
