import {AddEquipment} from '../Action/AddEquipment';
import {SheetBuilderError} from '../../errors/SheetBuilderError';
import type {Equipment} from '../Inventory/Equipment/Equipment';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {OriginBenefit} from './OriginBenefit/OriginBenefit';
import {type OriginBenefits} from './OriginBenefit/OriginBenefits';
import {type SerializedOriginBenefit, type SerializedOriginBenefits} from './OriginBenefit/SerializedOriginBenefit';
import type {OriginName} from './OriginName';
import {SerializedSheetOrigin, type SerializedOrigins} from './SerializedOrigin';

export type OriginInterface<
	Sb extends SerializedOriginBenefit = SerializedOriginBenefits,
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
	Sb extends SerializedOriginBenefit = SerializedOriginBenefit,
	So extends SerializedOrigins = SerializedOrigins,
> implements OriginInterface<Sb, So> {
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

	abstract serialize(): SerializedSheetOrigin<So>;

	protected serializeBenefits(): Sb[] {
		return this.chosenBenefits.map(benefit => benefit.serialize());
	}

	protected serializeEquipments() {
		return this.equipments.map(equipment => equipment.serialize());
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
