import {AbilityEffects} from '../../../Ability';
import {AbilityEffectsStatic} from '../../../Ability/AbilityEffectsStatic';
import {OriginName, type SerializedOriginPowers} from '../../../Origin';
import {OriginPower} from '../OriginPower';
import {OriginPowerName} from '../OriginPowerName';
import {BlueBloodEffect} from './BlueBloodEffect';

export class BlueBlood extends OriginPower<SerializedOriginPowers['blueBlood']> {
	static readonly powerName = OriginPowerName.blueBlood;
	static readonly effects = new AbilityEffectsStatic({
		roleplay: {
			default: BlueBloodEffect,
		},
	});

	override source: OriginName = OriginName.aristocrat;
	override effects = new AbilityEffects({
		roleplay: {
			default: new BlueBloodEffect(),
		},
	});

	constructor() {
		super(BlueBlood.powerName);
	}

	override serialize() {
		return this.serializeBasic();
	}
}
