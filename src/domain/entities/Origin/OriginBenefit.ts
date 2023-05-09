import {type TransactionInterface} from '../Sheet/TransactionInterface';
import {type TranslatableName} from '../Translator';
import type {OriginBenefits} from './Origin';

export abstract class OriginBenefit {
	abstract apply(transaction: TransactionInterface, source: TranslatableName): void;
	abstract validate(originBenefits: OriginBenefits): void;
}
