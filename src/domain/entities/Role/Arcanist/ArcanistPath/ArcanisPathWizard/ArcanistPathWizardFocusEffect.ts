import {PassiveEffect} from '../../../../Ability/PassiveEffect';
import {AddEquipment} from '../../../../Action/AddEquipment';
import {type SheetBaseInterface} from '../../../../Sheet/SheetBaseInterface';
import {type Dispatch} from '../../../../Sheet/Transaction';
import {RoleAbilityName} from '../../../RoleAbilityName';
import {ArcanistPathName} from '../ArcanistPath';
import {type ArcanistPathWizardFocus} from './ArcanistPathWizardFocus';

export class ArcanistPathWizardFocusEffect extends PassiveEffect {
	constructor(
		readonly focus: ArcanistPathWizardFocus,
	) {
		super(RoleAbilityName.arcanistPath);
	}

	override applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new AddEquipment({
			equipment: this.focus.equipment,
			source: ArcanistPathName.wizard,
		}), sheet);
	}
}
