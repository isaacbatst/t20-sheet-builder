import type {Action} from '../../Action/Action';
import {PickGeneralPower} from '../../Action/PickGeneralPower';
import type {Translatable} from '../../Translator';
import type {PowerInterface} from '../Power';
import {Power} from '../Power';
import {type GeneralPowerGroup} from './GeneralPowerGroup';
import type {GeneralPowerName} from './GeneralPowerName';

export type GeneralPowerInterface = PowerInterface & {
	name: GeneralPowerName;
};

export abstract class GeneralPower extends Power implements GeneralPowerInterface {
	abstract group: GeneralPowerGroup;

	constructor(
		override readonly name: GeneralPowerName,
	) {
		super(name, 'general');
	}

	protected getAddAction(source: Translatable): Action {
		return new PickGeneralPower({
			power: this,
			source,
		});
	}
}
