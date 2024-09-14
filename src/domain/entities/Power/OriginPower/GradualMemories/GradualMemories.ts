import {AbilityEffects} from '../../../Ability';
import {AbilityEffectsStatic} from '../../../Ability/AbilityEffectsStatic';
import {type SerializedOrigins} from '../../../Origin';
import {OriginName} from '../../../Origin/OriginName';
import {OriginPower} from '../OriginPower';
import {OriginPowerName} from '../OriginPowerName';
import {GradualMemoriesEffect} from './GradualMemoriesEffect';

export class GradualMemories extends OriginPower<SerializedOrigins['amnesic']['originPower']> {
	static readonly powerName = OriginPowerName.gradualMemories;

	static readonly effects = new AbilityEffectsStatic({
		roleplay: {
			default: GradualMemoriesEffect,
		},
	});

	override source = OriginName.amnesic;
	override effects = new AbilityEffects({
		roleplay: {
			default: new GradualMemoriesEffect(),
		},
	});

	constructor() {
		super(GradualMemories.powerName);
	}

	override serialize() {
		return this.serializeBasic();
	}
}
