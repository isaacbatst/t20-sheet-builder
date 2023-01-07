import type {EquipmentName} from '../../../Inventory';
import type {ArcanistPathWizardFocus} from './ArcanistPathWizardFocus';
import {ArcanistPathWizardFocusStaff} from './ArcanistPathWizardFocusStaff';
import {ArcanistPathWizardFocusWand} from './ArcanistPathWizardFocusWand';

export type ArcanistPathWizardFocusStatic = {
	equipmentName: EquipmentName;
	new(): ArcanistPathWizardFocus;
};

export abstract class ArcanistPathWizardFocuses {
	static getAll(): ArcanistPathWizardFocusStatic[] {
		return [
			ArcanistPathWizardFocusWand,
			ArcanistPathWizardFocusStaff,
		];
	}
}
