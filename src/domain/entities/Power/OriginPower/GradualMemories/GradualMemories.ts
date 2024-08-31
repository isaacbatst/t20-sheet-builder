import {OriginPower} from '../OriginPower';
import {OriginPowerName} from '../OriginPowerName';
import {AbilityEffects} from '../../../Ability';
import {AbilityEffectsStatic} from '../../../Ability/AbilityEffectsStatic';
import {GradualMemoriesEffect} from './GradualMemoriesEffect';
import {OriginName} from '../../../Origin/OriginName';
import {type SerializedGradualMemories} from '../../../Origin/OriginBenefit/SerializedOriginBenefit';

export class GradualMemories extends OriginPower<SerializedGradualMemories> {
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

	override serializeSpecific(): SerializedGradualMemories {
		return {
			name: OriginPowerName.gradualMemories,
		};
	}
}
