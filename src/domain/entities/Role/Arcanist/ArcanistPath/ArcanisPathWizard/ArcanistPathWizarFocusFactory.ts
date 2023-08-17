import {SheetBuilderError} from '../../../../../errors';
import {EquipmentName} from '../../../../Inventory';
import {type ArcanistPathWizardFocus} from './ArcanistPathWizardFocus';
import {ArcanistPathWizardFocusStaff} from './ArcanistPathWizardFocusStaff';
import {ArcanistPathWizardFocusWand} from './ArcanistPathWizardFocusWand';
import {type ArcanisPathWizardFocusName} from './ArcanistPathWizardFocuses';

export class ArcanistPathWizardFocusFactory {
	static make(focus: ArcanisPathWizardFocusName): ArcanistPathWizardFocus {
		if (focus === EquipmentName.staff) {
			return new ArcanistPathWizardFocusStaff();
		}

		if (focus === EquipmentName.wand) {
			return new ArcanistPathWizardFocusWand();
		}

		throw new SheetBuilderError('INVALID_WIZARD_FOCUS');
	}
}
