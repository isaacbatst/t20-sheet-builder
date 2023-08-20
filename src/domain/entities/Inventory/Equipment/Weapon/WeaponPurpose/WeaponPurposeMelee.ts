import {SkillName} from '../../../../Skill';
import {WeaponPurpose, type WeaponPurposeParams} from './WeaponPurpose';

type WeaponPurposeMeleeParams = Omit<
WeaponPurposeParams,
'defaultSkill'
>;

export class WeaponPurposeMelee extends WeaponPurpose {
	constructor(params: WeaponPurposeMeleeParams = {}) {
		super({
			defaultSkill: SkillName.fight,
			damageAttribute: params.damageAttribute ?? 'strength',
			...params,
		});
	}
}
