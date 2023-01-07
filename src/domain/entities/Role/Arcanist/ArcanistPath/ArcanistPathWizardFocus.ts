import type {Equipment} from '../../../Inventory/Equipment/Equipment';

export abstract class ArcanistPathWizardFocus {
	constructor(readonly equipment: Equipment) {}
}
