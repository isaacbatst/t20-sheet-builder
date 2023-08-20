import {SkillName} from '../../../../Skill';
import {WeaponPurpose, type WeaponPurposeParams} from './WeaponPurpose';

export type WeaponPurposeRangedParams = Omit<
WeaponPurposeParams,
'defaultSkill'
>;

export abstract class WeaponPurposeRanged extends WeaponPurpose {
	constructor(params: WeaponPurposeRangedParams) {
		super({
			defaultSkill: SkillName.aim,
			...params,
		});
	}
}
