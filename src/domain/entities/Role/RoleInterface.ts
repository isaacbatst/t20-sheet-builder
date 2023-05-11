import {type Level} from '../Sheet';
import type {Proficiency} from '../Sheet/Proficiency';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {SkillName} from '../Skill/SkillName';
import {type RoleAbility} from './RoleAbility';
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
	abilitiesPerLevel: Record<Level, Record<string, RoleAbility>>;
	chosenSkills: SkillName[];
	getTotalInitialSkills(): number;
	addToSheet(transaction: TransactionInterface): void;
};
