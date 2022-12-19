import type {CharacterInterface} from '../CharacterInterface';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerNameEnum} from './GeneralPowerName';

export class TwoHandsStyle extends GeneralPower {
	constructor() {
		super(
			GeneralPowerNameEnum.twoHandsStyle,
			'passive',
		);
	}

	apply(character: CharacterInterface): void {
		throw new Error('NOT_IMPLEMENTED');
	}
}
