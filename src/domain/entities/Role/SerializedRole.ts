import {type Proficiency, type SerializedSheetRoleAbility} from '../Sheet';
import {type SkillName} from '../Skill';
import {type SerializedArcanist} from './Arcanist';
import {type RoleName} from './RoleName';

export type SerializedWarrior = {
	name: RoleName.warrior;
};

export type SerializedBarbarian = {
	name: RoleName.barbarian;
};

export type SerializedBuccaneer = {
	name: RoleName.buccaneer;
};

export type SerializedBard = {
	name: RoleName.bard;
};

export type SerializedRoles =
 | SerializedWarrior
 | SerializedArcanist
 | SerializedBarbarian
 | SerializedBuccaneer
 | SerializedBard;

export type SerializedRole<R extends SerializedRoles = SerializedRoles> = SerializedRoleBasic & R;

export type SerializedRoleBasic = {
	initialLifePoints: number;
	lifePointsPerLevel: number;
	manaPerLevel: number;
	mandatorySkills: SkillName[];
	chosenSkills: SkillName[];
	selectSkillGroups: Array<{skills: SkillName[]; amount: number}>;
	proficiencies: Proficiency[];
	name: RoleName;
	startsWithArmor: boolean;
	totalInitialSkills: number;
	abilities: SerializedSheetRoleAbility[];
};
