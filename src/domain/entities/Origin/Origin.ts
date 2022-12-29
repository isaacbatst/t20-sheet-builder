import {AddEquipment} from '../Action/AddEquipment';
import type {Equipment} from '../Equipment/Equipment';
import type {GeneralPowerName} from '../Power/GeneralPowerName';
import type {OriginPowerName} from '../Power/OriginPower/OriginPowerName';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {SkillName} from '../Skill/SkillName';
import type {Dispatch} from '../Transaction';
import type {OriginBenefit} from './OriginBenefit';
import type {OriginName} from './OriginName';

export type OriginBenefits = {
	skills: SkillName[];
	generalPowers: GeneralPowerName[];
	originPower: OriginPowerName;
};

export abstract class Origin {
	abstract name: OriginName;
	abstract equipments: Equipment[];

	constructor(
		readonly chosenBenefits: OriginBenefit[],
		readonly benefits: OriginBenefits,
	) {
		this.validateChosenBenefits();
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch) {
		this.addEquipments(sheet, dispatch);
		this.addBenefits(sheet, dispatch);
	}

	private addBenefits(sheet: SheetBaseInterface, dispatch: Dispatch) {
		this.chosenBenefits.forEach(benefit => {
			benefit.addToSheet(sheet, dispatch, this.name);
		});
	}

	private addEquipments(sheet: SheetBaseInterface, dispatch: Dispatch) {
		this.equipments.forEach(equipment => {
			dispatch(new AddEquipment({
				equipment,
			}), sheet);
		});
	}

	private validateChosenBenefits() {
		if (this.chosenBenefits.length !== 2) {
			throw new Error('INVALID_ORIGIN_BENEFITS');
		}

		this.chosenBenefits.forEach(benefit => {
			benefit.validate(this.benefits);
		});
	}
}
