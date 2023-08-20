import {type SerializedSheetGeneralPower} from '../../Sheet/SerializedSheet/SerializedSheetInterface';
import type {PowerInterface} from '../Power';
import {Power} from '../Power';
import {type GeneralPowerGroup} from './GeneralPowerGroup';
import type {GeneralPowerName} from './GeneralPowerName';

export type GeneralPowerInterface = PowerInterface & {
	name: GeneralPowerName;
	group: GeneralPowerGroup;
	serialize(): SerializedSheetGeneralPower;
};

export abstract class GeneralPower extends Power implements GeneralPowerInterface {
	abstract group: GeneralPowerGroup;

	constructor(
		override readonly name: GeneralPowerName,
	) {
		super(name, 'general');
	}

	serialize(): SerializedSheetGeneralPower {
		return {
			name: this.name,
			abilityType: this.abilityType,
			effects: this.effects.serialize(),
			group: this.group,
		};
	}
}
