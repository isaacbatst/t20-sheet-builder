import {AddEquipment} from '../Action/AddEquipment';
import {SheetBuilderError} from '../Error/SheetBuilderError';
import type {Equipment} from '../Inventory/Equipment/Equipment';
import type {GeneralPowerName} from '../Power/GeneralPower/GeneralPowerName';
import type {OriginPowerName} from '../Power/OriginPower/OriginPowerName';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {SkillName} from '../Skill/SkillName';
import type {OriginBenefit} from './OriginBenefit';
import type {OriginName} from './OriginName';

export type OriginBenefits = {
	skills: SkillName[];
	generalPowers: GeneralPowerName[];
	originPower: OriginPowerName;
};

export type OriginInterface = {
	name: OriginName;
	equipments: Equipment[];
	chosenBenefits: OriginBenefit[];
	benefits: OriginBenefits;
	addToSheet(transaction: TransactionInterface): void;
};

export abstract class Origin implements OriginInterface {
	abstract name: OriginName;
	abstract equipments: Equipment[];

	constructor(
		readonly chosenBenefits: OriginBenefit[],
		readonly benefits: OriginBenefits,
	) {
		this.validateChosenBenefits();
	}

	addToSheet(transaction: TransactionInterface) {
		this.addEquipments(transaction);
		this.addBenefits(transaction);
	}

	private addBenefits(transaction: TransactionInterface) {
		this.chosenBenefits.forEach(benefit => {
			benefit.addToSheet(transaction, this.name);
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
