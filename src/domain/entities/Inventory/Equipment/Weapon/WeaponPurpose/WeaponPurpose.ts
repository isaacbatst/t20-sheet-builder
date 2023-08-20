import {type Attribute} from '../../../../Sheet';
import {type SkillName} from '../../../../Skill';

export abstract class WeaponPurpose {
	abstract defaultSkill: SkillName;
	abstract defaultDamageAttribute: Attribute | undefined;
}
