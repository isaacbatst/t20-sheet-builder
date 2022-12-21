import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerName} from './GeneralPowerName';

export class SwordAndShieldStyle extends GeneralPower {
	constructor() {
		super(
			GeneralPowerName.swordAndShieldStyle,
			'passive',
		);
	}

	apply(sheet: BuildingSheetInterface): void {
		throw new Error('NOT_IMPLEMENTED');
	}
}
