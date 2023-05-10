import type {PowerInterface} from '../Power';
import {Power} from '../Power';
import {type GeneralPowerGroup} from './GeneralPowerGroup';
import type {GeneralPowerName} from './GeneralPowerName';

export type GeneralPowerInterface = PowerInterface & {
	name: GeneralPowerName;
	group: GeneralPowerGroup;
};

export abstract class GeneralPower extends Power implements GeneralPowerInterface {
	abstract group: GeneralPowerGroup;

	constructor(
		override readonly name: GeneralPowerName,
	) {
		super(name, 'general');
	}
}
