import type {EquipmentName} from '../../../../Inventory';
import type {Static} from '../../../../Static';
import type {ArcanistPathWizardFocus} from './ArcanistPathWizardFocus';
import {ArcanistPathWizardFocusStaff} from './ArcanistPathWizardFocusStaff';
import {ArcanistPathWizardFocusWand} from './ArcanistPathWizardFocusWand';

export type ArcanistPathWizardFocusStatic = Static<ArcanistPathWizardFocus, {
	equipmentName: EquipmentName;
}>;

export type ArcanisPathWizardFocusName = EquipmentName.staff | EquipmentName.wand;

export abstract class ArcanistPathWizardFocuses {
	static getAll(): ArcanistPathWizardFocusStatic[] {
		return [
			ArcanistPathWizardFocusWand,
			ArcanistPathWizardFocusStaff,
		];
	}
}
