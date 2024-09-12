import {SkillName} from '../../../../Skill';
import {WeaponPurpose, type WeaponPurposeParams} from './WeaponPurpose';

export type WeaponPurposeRangedParams = Omit<
WeaponPurposeParams,
'defaultSkill'
> & {
	range: 'short' | 'medium' | 'long';
};

export abstract class WeaponPurposeRanged extends WeaponPurpose {
	readonly range: 'short' | 'medium' | 'long';

	constructor(params: WeaponPurposeRangedParams) {
		super({
			defaultSkill: SkillName.aim,
			...params,
		});

		this.range = params.range;
	}
}
