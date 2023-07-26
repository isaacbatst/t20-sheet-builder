import {PickGeneralPower} from '../../Action/PickGeneralPower';
import {SheetBuilderError} from '../../../errors/SheetBuilderError';
import {GeneralPowerFactory, type GeneralPowerName} from '../../Power';
import type {GeneralPowerInterface} from '../../Power/GeneralPower/GeneralPower';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {type TranslatableName} from '../../Translator';
import {OriginBenefit} from './OriginBenefit';
import {type OriginBenefits} from './OriginBenefits';

export type SerializedOriginBenefitGeneralPower = {
	type: 'generalPowers';
	name: GeneralPowerName;
};

export class OriginBenefitGeneralPower extends OriginBenefit<SerializedOriginBenefitGeneralPower> {
	override name: GeneralPowerName;

	constructor(
		readonly power: GeneralPowerInterface,
	) {
		super();
		this.name = power.name;
	}

	override serialize(): SerializedOriginBenefitGeneralPower {
		return {
			name: this.power.name,
			type: 'generalPowers',
		};
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
