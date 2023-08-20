import {SkillName} from '../../../../Skill';
import {WeaponPurpose} from './WeaponPurpose';

export abstract class WeaponPurposeRanged extends WeaponPurpose {
	defaultSkill = SkillName.aim;
}
