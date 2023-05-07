import {PassiveEffect} from '../../../../../../Ability/PassiveEffect';
import {AddFixedModifierToLifePoints} from '../../../../../../Action/AddFixedModifierToLifePoints';
import {FixedModifier} from '../../../../../../Modifier/FixedModifier/FixedModifier';
import {type SheetBaseInterface} from '../../../../../../Sheet/SheetBaseInterface';
import {type Dispatch} from '../../../../../../Sheet/Transaction';
import {RoleAbilityName} from '../../../../../RoleAbilityName';

export class ArcanistLineageDraconicCharismaBonusEffect extends PassiveEffect {
	constructor() {
		super(RoleAbilityName.arcanistSupernaturalLineage);
	}

	override applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new AddFixedModifierToLifePoints({
			modifier: new FixedModifier(this.source, 0, new Set(['charisma'])),
		}), sheet);
	}
}
