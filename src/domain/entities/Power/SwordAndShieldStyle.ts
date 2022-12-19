import type {CharacterInterface} from '../Character';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerNameEnum} from './GeneralPowerName';

export class SwordAndShieldStyle extends GeneralPower {
	constructor() {
		super(
			GeneralPowerNameEnum.swordAndShieldStyle,
			'passive',
		);
	}

	apply(character: CharacterInterface): void {
		throw new Error('NOT_IMPLEMENTED');
	}
}
