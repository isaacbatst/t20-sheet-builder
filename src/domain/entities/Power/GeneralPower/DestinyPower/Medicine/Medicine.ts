import {AbilityEffects} from '../../../../Ability/AbilityEffects';
import {AbilityEffectsStatic} from '../../../../Ability/AbilityEffectsStatic';
import {SkillName} from '../../../../Skill/SkillName';
import {AttributeRequirement} from '../../../Requirement/AttributeRequirement';
import {SkillRequirement} from '../../../Requirement/SkillRequirement';
import {GeneralPower} from '../../GeneralPower';
import {GeneralPowerGroup} from '../../GeneralPowerGroup';
import {GeneralPowerName} from '../../GeneralPowerName';
import {MedicineEffect} from './MedicineEffect';

export class Medicine extends GeneralPower {
	static readonly powerName = GeneralPowerName.medicine;
	static readonly effects = new AbilityEffectsStatic({
		activateable: {
			default: MedicineEffect,
		},
	});

	private static readonly wisdomRequirement = new AttributeRequirement(
		'wisdom',
		1,
	);

	private static readonly cureRequirement = new SkillRequirement(SkillName.cure);

	override group: GeneralPowerGroup = GeneralPowerGroup.destiny;
	effects = new AbilityEffects({
		activateable: {
			default: new MedicineEffect(),
		},
	});

	constructor() {
		super(GeneralPowerName.medicine);
		this.addRequirement(Medicine.wisdomRequirement);
		this.addRequirement(Medicine.cureRequirement);
	}
}
