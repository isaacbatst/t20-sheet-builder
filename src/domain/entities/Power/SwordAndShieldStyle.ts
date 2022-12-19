import type {CharacterInterface} from '../CharacterInterface';
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
