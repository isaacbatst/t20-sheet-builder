import {Equipment, EquipmentName} from '../../../Inventory';
import {EquipmentWizardFocus} from '../../../Inventory/Equipment/EquipmentWizardFocus/EquipmentWizardFocus';
import {ArcanistPathWizardFocus} from './ArcanistPathWizardFocus';

export class ArcanistPathWizardFocusStaff extends ArcanistPathWizardFocus {
	static equipmentName = EquipmentName.staff;

	constructor() {
		super(new EquipmentWizardFocus(EquipmentName.staff));
	}
}
