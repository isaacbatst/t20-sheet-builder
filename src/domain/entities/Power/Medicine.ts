import type {AbilityEffect} from '../Ability/AbilityEffect';
import {SkillName} from '../Skill/SkillName';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerName} from './GeneralPowerName';
import {MedicineEffect} from './MedicineEffect';
import {AttributeRequirement} from './Requirement/AttributeRequirement';
import {SkillRequirement} from './Requirement/SkillRequirement';

export class Medicine extends GeneralPower {
	private static readonly wisdomRequirement = new AttributeRequirement(
		'wisdom',
		1,
	);

	private static readonly cureRequirement = new SkillRequirement(SkillName.cure);

	effects: Record<string, AbilityEffect> = {
		default: new MedicineEffect(),
	};

	constructor() {
		super(GeneralPowerName.medicine);
		this.addRequirement(Medicine.wisdomRequirement);
		this.addRequirement(Medicine.cureRequirement);
	}
}
