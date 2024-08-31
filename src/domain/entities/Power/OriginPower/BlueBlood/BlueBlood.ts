import {AbilityEffects, AbilityEffectsInterface} from '../../../Ability';
import {AbilityEffectsStatic} from '../../../Ability/AbilityEffectsStatic';
import {OriginName, type SerializedBlueBlood} from '../../../Origin';
import {OriginPower} from '../OriginPower';
import {OriginPowerName} from '../OriginPowerName';
import {BlueBloodEffect} from './BlueBloodEffect';

export class BlueBlood extends OriginPower<SerializedBlueBlood> {
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

	override serializeSpecific(): SerializedBlueBlood {
		return {
			name: BlueBlood.powerName,
		};
	}
}
