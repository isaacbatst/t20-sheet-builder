import {PassiveEffect} from '../../../../../Ability/PassiveEffect';
import {LearnSpell} from '../../../../../Action/AddSpell';
import {SheetBuilderError} from '../../../../../Error';
import {type SheetBaseInterface} from '../../../../../Sheet/SheetBaseInterface';
import {type Dispatch} from '../../../../../Sheet/Transaction';
import {SpellSchool, type Spell} from '../../../../../Spell';
import {RoleAbilityName} from '../../../../RoleAbilityName';

export class ArcanistLineageFaerieExtraSpellEffect extends PassiveEffect {
	constructor(
		readonly spell: Spell,
	) {
		super(RoleAbilityName.arcanistSupernaturalLineage);

		if (spell.school !== SpellSchool.illusion && spell.school !== SpellSchool.enchantment) {
			throw new SheetBuilderError('INVALID_FAERIE_SPELL_SCHOOL');
		}
	}

	override applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new LearnSpell({
			spell: this.spell,
			source: this.source,
		}), sheet);
	}
}
