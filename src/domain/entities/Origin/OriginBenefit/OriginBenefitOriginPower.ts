import {SheetBuilderError} from '../../../errors/SheetBuilderError';
import {PickOriginPower} from '../../Action/PickOriginPower';
import {type OriginPowerName} from '../../Power';
import type {OriginPowerInterface} from '../../Power/OriginPower/OriginPower';
import type {Transaction} from '../../Sheet/Transaction';
import {type TranslatableName} from '../../Translator';
import {OriginBenefit} from './OriginBenefit';
import {type OriginBenefits} from './OriginBenefits';
import {type SerializedOriginPower} from './SerializedOriginBenefit';

export class OriginBenefitOriginPower<S extends SerializedOriginPower> extends OriginBenefit<S> {
	override name: OriginPowerName;
	constructor(
		readonly power: OriginPowerInterface<S>,
	) {
		super();
		this.name = power.name;
	}

	apply(transaction: Transaction, source: TranslatableName): void {
		transaction.run(new PickOriginPower({
			payload: {
				power: this.power as OriginPowerInterface,
				source,
			},
			transaction,
		}));
	}

	validate(originBenefits: OriginBenefits): void {
		if (originBenefits.originPower !== this.power.name) {
			throw new SheetBuilderError('INVALID_ORIGIN_POWER');
		}
	}

	override serialize(): S {
		return this.power.serialize();
	}
}
