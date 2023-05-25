import {AddEquipment} from '../Action/AddEquipment';
import {SheetBuilderError} from '../Error/SheetBuilderError';
import type {Equipment} from '../Inventory/Equipment/Equipment';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {OriginBenefit} from './OriginBenefit/OriginBenefit';
import {type OriginBenefits} from './OriginBenefit/OriginBenefits';
import {type SerializedOriginBenefits, type SerializedOriginBenefit} from './OriginBenefit/SerializedOriginBenefit';
import type {OriginName} from './OriginName';
import {type SerializedOrigin} from './SerializedOrigin';

export type OriginInterface<Sb extends SerializedOriginBenefit = SerializedOriginBenefits, So extends SerializedOrigin<Sb> = SerializedOrigin<Sb>> = {
	name: OriginName;
	equipments: Equipment[];
	chosenBenefits: Array<OriginBenefit<Sb>>;
	benefits: OriginBenefits;
	addToSheet(transaction: TransactionInterface): void;
	serialize(): SerializedOrigin<Sb>;
};

export abstract class Origin<Sb extends SerializedOriginBenefit = SerializedOriginBenefit> implements OriginInterface<Sb> {
	abstract name: OriginName;
	abstract equipments: Equipment[];

	constructor(
		readonly chosenBenefits: Array<OriginBenefit<Sb>>,
		readonly benefits: OriginBenefits,
	) {
		this.validateChosenBenefits();
	}

	addToSheet(transaction: TransactionInterface) {
		this.addEquipments(transaction);
		this.applyBenefits(transaction);
	}

	serialize(): SerializedOrigin<Sb> {
		return {
			choosenBenefits: this.chosenBenefits.map(benefit => benefit.serialize()),
			name: this.name,
		};
	}

	private applyBenefits(transaction: TransactionInterface) {
		this.chosenBenefits.forEach(benefit => {
			benefit.apply(transaction, this.name);
		});
	}

	private addEquipments(transaction: TransactionInterface) {
		this.equipments.forEach(equipment => {
			transaction.run(new AddEquipment({
				payload: {
					equipment,
					source: this.name,
				},
				transaction,
			}));
		});
	}

	private validateChosenBenefits() {
		if (this.chosenBenefits.length !== 2) {
			throw new SheetBuilderError('INVALID_ORIGIN_BENEFITS');
		}

		this.chosenBenefits.forEach(benefit => {
			benefit.validate(this.benefits);
		});
	}
}
