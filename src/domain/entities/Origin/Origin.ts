import {SheetBuilderError} from '../../errors/SheetBuilderError';
import {AddEquipment} from '../Action/AddEquipment';
import type {Equipment} from '../Inventory/Equipment/Equipment';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {OriginBenefit} from './OriginBenefit/OriginBenefit';
import {type OriginBenefits} from './OriginBenefit/OriginBenefits';
import {type SerializedOriginBenefit, type SerializedOriginPowers} from './OriginBenefit/SerializedOriginBenefit';
import type {OriginName} from './OriginName';
import {type SerializedOrigins, type SerializedSheetOrigin} from './SerializedOrigin';

export type OriginInterface<
	Sb extends SerializedOriginPowers = SerializedOriginPowers,
	So extends SerializedOrigins = SerializedOrigins,
> = {
	name: OriginName;
	equipments: Equipment[];
	chosenBenefits: Array<OriginBenefit<Sb>>;
	benefits: OriginBenefits;
	addToSheet(transaction: TransactionInterface): void;
	serialize(): So;
};

export abstract class Origin<
	SerializedBenefit extends SerializedOriginPowers = SerializedOriginPowers,
	SerializedOrigin extends SerializedOrigins = SerializedOrigins,
> implements OriginInterface<SerializedBenefit, SerializedOrigin> {
	abstract name: OriginName;

	constructor(
		readonly chosenBenefits: Array<OriginBenefit<SerializedBenefit>>,
		readonly benefits: OriginBenefits,
		readonly equipments: Equipment[],
	) {
		this.validateChosenBenefits();
	}

	addToSheet(transaction: TransactionInterface) {
		this.addEquipments(transaction);
		this.applyBenefits(transaction);
	}

	abstract serialize(): SerializedSheetOrigin<SerializedOrigin>;

	protected serializeBenefits(): Array<SerializedOriginBenefit<SerializedBenefit>> {
		return this.chosenBenefits.map(benefit => benefit.serialize());
	}

	protected serializeEquipments() {
		return this.equipments.map(equipment => equipment.serialize());
	}

	protected validateChosenBenefits() {
		if (this.chosenBenefits.length !== 2) {
			throw new SheetBuilderError('INVALID_ORIGIN_BENEFITS');
		}

		this.chosenBenefits.forEach(benefit => {
			benefit.validate(this.benefits);
		});
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
}
