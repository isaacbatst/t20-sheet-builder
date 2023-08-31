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

export type SerializedRanger = {
	name: RoleName.ranger;
};

export type SerializedKnight = {
	name: RoleName.knight;
};

export type SerializedCleric = {
	name: RoleName.cleric;
};

export type SerializedDruid = {
	name: RoleName.druid;
};

export type SerializedInventor = {
	name: RoleName.inventor;
};

export type SerializedRogue = {
	name: RoleName.rogue;
};

export type SerializedFighter = {
	name: RoleName.fighter;
};

export type SerializedNoble = {
	name: RoleName.noble;
};

export type SerializedPaladin = {
	name: RoleName.paladin;
};

export type SerializedRoles =
 | SerializedWarrior
 | SerializedArcanist
 | SerializedBarbarian
 | SerializedBuccaneer
 | SerializedBard
 | SerializedRanger
 | SerializedKnight
 | SerializedCleric
 | SerializedDruid
 | SerializedInventor
 | SerializedRogue
 | SerializedFighter
 | SerializedNoble
 | SerializedPaladin;

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
	selectedSkillsByGroup: SkillName[][];
};
