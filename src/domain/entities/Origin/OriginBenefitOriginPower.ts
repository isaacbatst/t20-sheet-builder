import type {OriginPowerInterface} from '../Power/OriginPower/OriginPower';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Dispatch} from '../Transaction';
import type {OriginBenefits} from './Origin';
import {OriginBenefit} from './OriginBenefit';

export class OriginBenefitOriginPower extends OriginBenefit {
	constructor(
		readonly power: OriginPowerInterface,
	) {
		super();
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		this.power.addToSheet(sheet, dispatch);
	}

	validate(originBenefits: OriginBenefits): void {
		if (originBenefits.originPower !== this.power.name) {
			throw new Error('INVALID_ORIGIN_POWER');
		}
	}
}
