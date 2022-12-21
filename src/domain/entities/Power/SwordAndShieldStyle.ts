import type {SheetInterface} from '../SheetInterface';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerNameEnum} from './GeneralPowerName';

export class SwordAndShieldStyle extends GeneralPower {
	constructor() {
		super(
			GeneralPowerNameEnum.swordAndShieldStyle,
			'passive',
		);
	}

	apply(character: SheetInterface): void {
		throw new Error('NOT_IMPLEMENTED');
	}
}
