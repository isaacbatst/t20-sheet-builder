import {PickOriginPower} from '../Action/PickOriginPower';
import type {OriginPowerInterface} from '../Power/OriginPower/OriginPower';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Dispatch} from '../Transaction';
import type {Translatable} from '../Translator';
import type {OriginBenefits} from './Origin';
import {OriginBenefit} from './OriginBenefit';

export class OriginBenefitOriginPower extends OriginBenefit {
	constructor(
		readonly power: OriginPowerInterface,
	) {
		super();
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable): void {
		dispatch(new PickOriginPower({power: this.power}), sheet);
	}

	validate(originBenefits: OriginBenefits): void {
		if (originBenefits.originPower !== this.power.name) {
			throw new Error('INVALID_ORIGIN_POWER');
		}
	}
}
