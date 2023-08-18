import {type Proficiency, type SerializedSheetRoleAbility} from '../Sheet';
import {type SkillName} from '../Skill';
import {type SerializedArcanist} from './Arcanist';
import {type RoleName} from './RoleName';

export type SerializedWarrior = {
	name: RoleName.warrior;
};

export type SerializedRoles = SerializedWarrior | SerializedArcanist;

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
