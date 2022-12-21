import type {Proficiency} from '../Proficiency';
import type {SkillName} from '../Skill/SkillName';
import type {ChooseableSkills, RoleInterface} from './RoleInterface';
import type {RoleName} from './RoleName';

export abstract class Role implements RoleInterface {
	abstract readonly initialLifePoints: number;
	abstract readonly lifePointsPerLevel: number;
	abstract readonly manaPerLevel: number;
	abstract readonly mandatorySkills: SkillName[];
	abstract readonly chooseableSkills: ChooseableSkills[];
	abstract readonly proficiencies: Proficiency[];
	abstract readonly name: RoleName;
}
