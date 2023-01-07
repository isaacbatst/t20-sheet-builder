import type {Proficiency} from '../Sheet/Proficiency';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Dispatch} from '../Sheet/Transaction';
import type {SkillName} from '../Skill/SkillName';
import type {RoleName} from './RoleName';

export type SelectSkillGroup = {skills: SkillName[]; amount: number};

export type RoleInterface = {
	initialLifePoints: number;
	lifePointsPerLevel: number;
	manaPerLevel: number;
	mandatorySkills: SkillName[];
	selectSkillGroups: SelectSkillGroup[];
	proficiencies: Proficiency[];
	name: RoleName;
	startsWithArmor: boolean;

	getTotalInitialSkills(): number;
	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void;
};
