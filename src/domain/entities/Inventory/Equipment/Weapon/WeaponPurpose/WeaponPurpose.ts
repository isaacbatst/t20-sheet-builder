import {type Attribute} from '../../../../Sheet';
import {type SkillName} from '../../../../Skill';

export type WeaponPurposeParams = {
	penalty?: number;
	customTestAttributes?: Set<Attribute>;
	damageAttribute?: Attribute;
	defaultSkill: SkillName;
};
export abstract class WeaponPurpose {
	readonly penalty: number;
	readonly customTestAttributes: Set<Attribute>;
	readonly damageAttribute: Attribute | undefined;
	readonly defaultSkill: SkillName;

	constructor(params: WeaponPurposeParams) {
		this.penalty = params.penalty ?? 0;
		this.customTestAttributes = params.customTestAttributes ?? new Set();
		this.damageAttribute = params.damageAttribute;
		this.defaultSkill = params.defaultSkill;
	}
}
