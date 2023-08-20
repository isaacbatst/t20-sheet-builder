import {Equipment} from '../Equipment';
import type {EquipmentName} from '../EquipmentName';

export type EquipmentWizardFocusName = EquipmentName.wand | EquipmentName.staff;

export class EquipmentWizardFocus extends Equipment {
	constructor(
		readonly name: EquipmentWizardFocusName,
		readonly isWieldable = false,
	) {
		super();
	}
}
