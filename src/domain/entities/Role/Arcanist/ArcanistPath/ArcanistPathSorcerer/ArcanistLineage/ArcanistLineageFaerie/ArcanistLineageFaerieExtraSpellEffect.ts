import {PassiveEffect} from '../../../../../../Ability/PassiveEffect';
import {LearnSpell} from '../../../../../../Action/AddSpell';
import {SheetBuilderError} from '../../../../../../Error';
import {type TransactionInterface} from '../../../../../../Sheet/TransactionInterface';
import {SpellSchool, type Spell} from '../../../../../../Spell';
import {RoleAbilityName} from '../../../../../RoleAbilityName';

export class ArcanistLineageFaerieExtraSpellEffect extends PassiveEffect {
	constructor(
		readonly spell: Spell,
	) {
		super(RoleAbilityName.arcanistSupernaturalLineage);

		if (spell.school !== SpellSchool.illusion && spell.school !== SpellSchool.enchantment) {
			throw new SheetBuilderError('INVALID_FAERIE_SPELL_SCHOOL');
		}
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new LearnSpell({
			payload: {
				spell: this.spell,
				source: this.source,
			},
			transaction,
		}));
	}
}
