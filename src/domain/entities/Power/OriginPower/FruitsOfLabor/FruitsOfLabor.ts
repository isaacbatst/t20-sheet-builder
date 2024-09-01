import {OriginPower, OriginPowerName} from '..';
import {AbilityEffects, type AbilityEffectsInterface} from '../../../Ability';
import {AbilityEffectsStatic} from '../../../Ability/AbilityEffectsStatic';
import {OriginName, type SerializedOriginPowerBasic, type SerializedOriginPowers} from '../../../Origin';
import {FruitsOfLaborEffect} from './FruitsOfLaborEffect';

export class FruitsOfLabor extends OriginPower<SerializedOriginPowers['fruitsOfLabor']> {
	static readonly powerName = OriginPowerName.fruitsOfLabor;
	static readonly effects = new AbilityEffectsStatic({
		roleplay: {
			default: FruitsOfLaborEffect,
		},
	});

	source: OriginName = OriginName.artisan;
	override effects: AbilityEffectsInterface = new AbilityEffects({
		roleplay: {
			default: new FruitsOfLaborEffect(),
		},
	});

	constructor() {
		super(FruitsOfLabor.powerName);
	}

	override serialize(): SerializedOriginPowerBasic<OriginPowerName.fruitsOfLabor> {
		return this.serializeBasic();
	}
}
