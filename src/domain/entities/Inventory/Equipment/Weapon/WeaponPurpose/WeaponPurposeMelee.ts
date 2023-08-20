import {type Attribute} from '../../../../Sheet';
import {SkillName} from '../../../../Skill';
import {WeaponPurpose} from './WeaponPurpose';

export class WeaponPurposeMelee extends WeaponPurpose {
	defaultSkill = SkillName.fight;
	defaultDamageAttribute: Attribute = 'strength';
}
