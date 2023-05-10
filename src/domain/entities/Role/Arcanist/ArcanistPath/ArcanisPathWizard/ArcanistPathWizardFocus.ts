import {type EquipmentWizardFocus} from '../../../../Inventory/Equipment/EquipmentWizardFocus/EquipmentWizardFocus';

export abstract class ArcanistPathWizardFocus {
	constructor(readonly equipment: EquipmentWizardFocus) {}
}
