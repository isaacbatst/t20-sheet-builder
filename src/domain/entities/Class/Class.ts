import type {Proficiency} from '../Proficiency';
import type {SkillName} from '../Skill/SkillName';

export abstract class Class {
	abstract initialLifePoints: number;
	abstract lifePointsPerLevel: number;
	abstract manaPerLevel: number;
	abstract mandatorySkills: SkillName[];
	abstract chooseableSkills: SkillName[];
	abstract chooseableSkillsAmount: number;
	abstract proficiencies: Proficiency[];
}
