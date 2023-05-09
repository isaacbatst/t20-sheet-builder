import {PassiveEffect} from '../../../../../../Ability/PassiveEffect';
import {LearnSpell} from '../../../../../../Action/AddSpell';
import {SheetBuilderError} from '../../../../../../Error';
import {type TransactionInterface} from '../../../../../../Sheet/TransactionInterface';
import {SpellSchool, type Spell} from '../../../../../../Spell';
import {RoleAbilityName} from '../../../../../RoleAbilityName';

export class ArcanistLineageFaerieExtraSpellEffect extends PassiveEffect {
	get description() {
		return 'Você aprende uma magia de 1º círculo de encantamento ou ilusão, arcana ou divina, a sua escolha.';
	}

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
