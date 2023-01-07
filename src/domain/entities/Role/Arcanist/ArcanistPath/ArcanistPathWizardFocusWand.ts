import {Equipment, EquipmentName} from '../../../Inventory';
import {ArcanistPathWizardFocus} from './ArcanistPathWizardFocus';

export class ArcanistPathWizardFocusWand extends ArcanistPathWizardFocus {
	static equipmentName = EquipmentName.wand;

	constructor() {
		super(new Equipment(EquipmentName.wand));
	}
}
