import {SheetBuilderError} from '../../errors/SheetBuilderError';
import {AddEquipment} from '../Action/AddEquipment';
import type {Equipment} from '../Inventory/Equipment/Equipment';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {OriginBenefit} from './OriginBenefit/OriginBenefit';
import {type OriginBenefits} from './OriginBenefit/OriginBenefits';
import {type SerializedOriginBenefit} from './OriginBenefit/SerializedOriginBenefit';
import {OriginCatalog} from './OriginCatalog';
import {type OriginData} from './OriginData';
import type {OriginName} from './OriginName';
import {type SerializedOriginTypes, type SerializedSheetOrigin} from './SerializedOrigin';

export type OriginInterface<
	Serialized extends SerializedOriginTypes = SerializedOriginTypes,
> = {
	name: OriginName;
	equipments: Equipment[];
	chosenBenefits: Array<OriginBenefit<Serialized['originPower']>>;
	benefits: OriginBenefits;
	data: OriginData;
	addToSheet(transaction: TransactionInterface): void;
	serialize(): Serialized['origin'];
};

export abstract class Origin<
	Serialized extends SerializedOriginTypes = SerializedOriginTypes,
> implements OriginInterface<Serialized> {
	readonly data: OriginData;

	constructor(
		readonly name: Serialized['origin']['name'],
		readonly chosenBenefits: Array<OriginBenefit<Serialized['originPower']>>,
		readonly benefits: OriginBenefits,
		readonly equipments: Equipment[],
	) {
		this.data = OriginCatalog.items[this.name];
		this.validateChosenBenefits();
	}

	addToSheet(transaction: TransactionInterface) {
		this.addEquipments(transaction);
		this.applyBenefits(transaction);
	}

	abstract serialize(): SerializedSheetOrigin<Serialized['origin']>;

	protected serializeBenefits(): Array<SerializedOriginBenefit<Serialized['originPower']>> {
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
