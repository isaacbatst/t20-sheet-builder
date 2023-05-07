import {PassiveEffect} from '../../../../Ability/PassiveEffect';
import {AddFixedModifierToDefense} from '../../../../Action/AddFixedModifierToDefense';
import {FixedModifier} from '../../../../Modifier/FixedModifier/FixedModifier';
import {type SheetBaseInterface} from '../../../../Sheet/SheetBaseInterface';
import {type Dispatch} from '../../../../Sheet/Transaction';
import {GeneralPowerName} from '../../GeneralPowerName';

export class ShellEffect extends PassiveEffect {
	constructor() {
		super(GeneralPowerName.shell);
	}

	override applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new AddFixedModifierToDefense({
			modifier: new FixedModifier(GeneralPowerName.shell, 1),
		}), sheet);
	}
}
