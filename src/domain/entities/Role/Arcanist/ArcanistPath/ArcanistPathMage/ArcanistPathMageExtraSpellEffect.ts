import {PassiveEffect} from '../../../../Ability/PassiveEffect';
import {LearnSpell} from '../../../../Action/AddSpell';
import {type SheetBaseInterface} from '../../../../Sheet/SheetBaseInterface';
import {type Dispatch} from '../../../../Sheet/Transaction';
import {type Spell} from '../../../../Spell';
import {RoleAbilityName} from '../../../RoleAbilityName';
import {ArcanistPathName} from '../ArcanistPath';

export class ArcanistPathMageExtraSpellEffect extends PassiveEffect {
	constructor(readonly spell: Spell) {
		super(RoleAbilityName.arcanistPath);
	}

	override applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new LearnSpell({
			source: ArcanistPathName.mage,
			spell: this.spell,
		}), sheet);
	}
}
