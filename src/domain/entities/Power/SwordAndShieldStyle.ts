import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import type {Dispatch} from '../SheetInterface';
import type {Translatable} from '../Translator';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerName} from './GeneralPowerName';

export class SwordAndShieldStyle extends GeneralPower {
	constructor() {
		super(
			GeneralPowerName.swordAndShieldStyle,
			'passive',
		);
	}

	applyEffects(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		throw new Error('NOT_IMPLEMENTED');
	}
}
