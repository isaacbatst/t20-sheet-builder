import {EquipmentName} from '../../../Inventory';
import {EquipmentWizardFocus} from '../../../Inventory/Equipment/EquipmentWizardFocus/EquipmentWizardFocus';
import {ArcanistPathWizardFocus} from './ArcanistPathWizardFocus';

export class ArcanistPathWizardFocusWand extends ArcanistPathWizardFocus {
	static equipmentName = EquipmentName.wand;

	constructor() {
		super(new EquipmentWizardFocus(EquipmentName.wand));
	}
}
