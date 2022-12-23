import type {AbilityEffectType} from '../Ability/Ability';
import type {Action} from '../Action/Action';
import {PickGeneralPower} from '../Action/PickGeneralPower';
import type {ActionType} from '../SheetActions';
import type {Translatable} from '../Translator';
import type {GeneralPowerName} from './GeneralPowerName';
import type {PowerInterface} from './Power';
import {Power} from './Power';

export type GeneralPowerInterface = PowerInterface & {
	name: GeneralPowerName;
};

export abstract class GeneralPower extends Power implements GeneralPowerInterface {
	constructor(
		override readonly name: GeneralPowerName, effectType: AbilityEffectType,
	) {
		super(name, effectType, 'general');
	}

	protected getAction(source: Translatable): Action<ActionType> {
		return new PickGeneralPower({
			power: this,
			source,
		});
	}
}
