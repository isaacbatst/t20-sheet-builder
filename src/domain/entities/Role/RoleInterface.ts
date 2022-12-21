import type {Proficiency} from '../Proficiency';
import type {SkillName} from '../Skill/SkillName';
import type {RoleName} from './RoleName';

export type ChooseableSkills = {skills: SkillName[]; amount: number};

export type RoleInterface = {
	initialLifePoints: number;
	lifePointsPerLevel: number;
	manaPerLevel: number;
	mandatorySkills: SkillName[];
	chooseableSkills: ChooseableSkills[];
	proficiencies: Proficiency[];
	name: RoleName;
};
