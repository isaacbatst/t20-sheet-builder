import type {Proficiency} from '../Proficiency';
import type {SkillName} from '../Skill/SkillName';
import type {ClassName} from './ClassName';

export type ChooseableSkills = {skills: SkillName[]; amount: number};

export abstract class Class {
	abstract readonly initialLifePoints: number;
	abstract readonly lifePointsPerLevel: number;
	abstract readonly manaPerLevel: number;
	abstract readonly mandatorySkills: SkillName[];
	abstract readonly chooseableSkills: ChooseableSkills[];
	abstract readonly proficiencies: Proficiency[];
	abstract readonly name: ClassName;
}
