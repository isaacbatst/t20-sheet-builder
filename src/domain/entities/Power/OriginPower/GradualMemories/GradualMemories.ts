import {OriginPower, OriginPowerName} from '..';
import {AbilityEffects} from '../../../Ability';
import {AbilityEffectsStatic} from '../../../Ability/AbilityEffectsStatic';
import {OriginName, type SerializedGradualMemories} from '../../../Origin';
import {GradualMemoriesEffect} from './GradualMemoriesEffect';

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
