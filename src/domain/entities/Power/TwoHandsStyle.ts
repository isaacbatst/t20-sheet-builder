import type {SheetInterface} from '../SheetInterface';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerNameEnum} from './GeneralPowerName';

export class TwoHandsStyle extends GeneralPower {
	constructor() {
		super(
			GeneralPowerNameEnum.twoHandsStyle,
			'passive',
		);
	}

	apply(sheet: SheetInterface): void {
		throw new Error('NOT_IMPLEMENTED');
	}
}
