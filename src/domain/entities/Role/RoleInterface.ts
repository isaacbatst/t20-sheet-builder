import type {Proficiency} from '../Proficiency';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Dispatch} from '../Transaction';
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

	getTotalInitialSkills(): number;
	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void;
};
