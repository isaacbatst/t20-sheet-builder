import {AbilityEffects} from '../../../../Ability/AbilityEffects';
import {GeneralPower} from '../../GeneralPower';
import {GeneralPowerName} from '../../GeneralPowerName';
import {IronWillEffect} from './IronWillEffect';
import {AttributeRequirement} from '../../../Requirement/AttributeRequirement';
import {GeneralPowerGroup} from '../../GeneralPowerGroup';
import {AbilityEffectsStatic} from '../../../../Ability/AbilityEffectsStatic';

export class IronWill extends GeneralPower {
	static readonly powerName = GeneralPowerName.ironWill;
	static readonly effects = new AbilityEffectsStatic({
		passive: {
			default: IronWillEffect,
		},
	});

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
