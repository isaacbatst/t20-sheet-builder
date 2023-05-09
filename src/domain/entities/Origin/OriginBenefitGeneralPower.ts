import {SheetBuilderError} from '../Error/SheetBuilderError';
import type {GeneralPowerInterface} from '../Power/GeneralPower/GeneralPower';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import {type TranslatableName} from '../Translator';
import type {OriginBenefits} from './Origin';
import {OriginBenefit} from './OriginBenefit';

export class OriginBenefitGeneralPower extends OriginBenefit {
	constructor(
		readonly power: GeneralPowerInterface,
	) {
		super();
	}

	addToSheet(transaction: TransactionInterface, source: TranslatableName): void {
		this.power.addToSheet(transaction, source);
	}

	validate(originBenefits: OriginBenefits): void {
		if (!originBenefits.generalPowers.includes(this.power.name)) {
			throw new SheetBuilderError('INVALID_ORIGIN_POWER');
		}
	}
}
