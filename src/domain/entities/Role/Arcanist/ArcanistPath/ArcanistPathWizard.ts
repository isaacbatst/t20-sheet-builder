import {AddEquipment} from '../../../Action/AddEquipment';
import type {Attribute} from '../../../Sheet';
import type {SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../../Sheet/Transaction';
import type {SpellLearnFrequency} from '../../SpellsAbility';
import {ArcanistPath, ArcanistPathName} from './ArcanistPath';
import type {ArcanistPathWizardFocus} from './ArcanistPathWizardFocus';

export class ArcanistPathWizard extends ArcanistPath {
	spellsAttribute: Attribute = 'intelligence';
	spellLearnFrequency: SpellLearnFrequency = 'all';
	name: ArcanistPathName = ArcanistPathName.wizard;

	constructor(readonly focus: ArcanistPathWizardFocus) {
		super();
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new AddEquipment({
			equipment: this.focus.equipment,
			source: this.name,
		}), sheet);
	}
}
