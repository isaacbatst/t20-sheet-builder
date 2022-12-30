import type {GeneralPowerInterface} from '../Power/GeneralPower';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Dispatch} from '../Sheet/Transaction';
import type {Translatable} from '../Translator';
import type {OriginBenefits} from './Origin';
import {OriginBenefit} from './OriginBenefit';

export class OriginBenefitGeneralPower extends OriginBenefit {
	constructor(
		readonly power: GeneralPowerInterface,
	) {
		super();
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable): void {
		this.power.addToSheet(sheet, dispatch, source);
	}

	validate(originBenefits: OriginBenefits): void {
		if (!originBenefits.generalPowers.includes(this.power.name)) {
			throw new Error('INVALID_ORIGIN_POWER');
		}
	}
}
