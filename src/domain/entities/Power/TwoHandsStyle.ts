import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import type {SheetInterface} from '../SheetInterface';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerName} from './GeneralPowerName';

export class TwoHandsStyle extends GeneralPower {
	constructor() {
		super(
			GeneralPowerName.twoHandsStyle,
			'passive',
		);
	}

	apply(sheet: BuildingSheetInterface): void {
		throw new Error('NOT_IMPLEMENTED');
	}
}
