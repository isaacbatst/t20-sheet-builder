import type {Proficiency} from '../Sheet/Proficiency';
import type {ChooseableSkills, RoleInterface} from './RoleInterface';
import {RoleName} from './RoleName';
import type {SkillName} from '../Skill/SkillName';

export class RoleFake implements RoleInterface {
	initialLifePoints = 10;
	lifePointsPerLevel = 5;
	manaPerLevel = 5;
	mandatorySkills: SkillName[] = [];
	chooseableSkills: ChooseableSkills[] = [];
	proficiencies: Proficiency[] = [];
	name: RoleName = RoleName.warrior;
	getTotalInitialSkills = jest.fn(() => 5);
	addToSheet = jest.fn();
}
