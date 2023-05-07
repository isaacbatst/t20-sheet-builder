import {AbilityEffects} from '../../../../Ability/AbilityEffects';
import {GeneralPower} from '../../GeneralPower';
import {GeneralPowerName} from '../../GeneralPowerName';
import {IronWillEffect} from './IronWillEffect';
import {AttributeRequirement} from '../../../Requirement/AttributeRequirement';
import {GeneralPowerGroup} from '../../GeneralPowerGroup';

export class IronWill extends GeneralPower {
	override group: GeneralPowerGroup = GeneralPowerGroup.destiny;
	effects = new AbilityEffects({
		passive: {
			default: new IronWillEffect(this.name),
		},
	});

	constructor() {
		super(GeneralPowerName.ironWill);
		this.addRequirement(new AttributeRequirement('wisdom', 1));
	}
}
