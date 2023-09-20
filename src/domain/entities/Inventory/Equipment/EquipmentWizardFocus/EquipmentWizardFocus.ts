import {Equipment} from '../Equipment';
import type {EquipmentName} from '../EquipmentName';

export type EquipmentWizardFocusName = EquipmentName.wand | EquipmentName.staff;

export class EquipmentWizardFocus extends Equipment {
	override categoryForImprovement = null;
	constructor(
		readonly name: EquipmentWizardFocusName,
		readonly isWieldable = false,
		readonly price = 0,
	) {
		super();
	}
}
