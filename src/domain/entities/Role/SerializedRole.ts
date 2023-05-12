import {type SkillName} from '../Skill';
import {type SerializedArcanist} from './Arcanist';
import {type RoleName} from './RoleName';

export type SerializedWarrior = {
	name: RoleName.warrior;
};

export type SerializedRoles = SerializedWarrior | SerializedArcanist;

export type SerializedRole<R = SerializedRoles> = {
	chosenSkills: SkillName[];
	name: RoleName;
} & R;
