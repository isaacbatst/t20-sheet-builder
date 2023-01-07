import {Equipment, EquipmentName} from '../../../Inventory';
import {ArcanistPathWizardFocus} from './ArcanistPathWizardFocus';

export class ArcanistPathWizardFocusStaff extends ArcanistPathWizardFocus {
	static equipmentName = EquipmentName.staff;

	constructor() {
		super(new Equipment(EquipmentName.staff));
	}
}
