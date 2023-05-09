import {PickGeneralPower} from '../Action/PickGeneralPower';
import {SheetBuilderError} from '../Error/SheetBuilderError';
import {type GeneralPowerName} from '../Power';
import type {GeneralPowerInterface} from '../Power/GeneralPower/GeneralPower';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import {type TranslatableName} from '../Translator';
import type {OriginBenefits} from './Origin';
import {OriginBenefit} from './OriginBenefit';

export class OriginBenefitGeneralPower extends OriginBenefit {
	override name: GeneralPowerName;
	constructor(
		readonly power: GeneralPowerInterface,
	) {
		super();
		this.name = power.name;
	}

	apply(transaction: TransactionInterface, source: TranslatableName): void {
		transaction.run(new PickGeneralPower({
			payload: {
				power: this.power,
				source,
			},
			transaction,
		}));
	}

	validate(originBenefits: OriginBenefits): void {
		if (!originBenefits.generalPowers.includes(this.power.name)) {
			throw new SheetBuilderError('INVALID_ORIGIN_POWER');
		}
	}
}
