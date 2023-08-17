import {PassiveEffect} from '../../../Ability';
import {LearnSpell} from '../../../Action/LearnSpell';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {SpellFactory, type SpellName} from '../../../Spell';
import {RaceAbilityName} from '../../RaceAbilityName';

export class MysticTattooEffect extends PassiveEffect {
	override description = 'Você'
  + ' pode lançar uma magia de 1º'
  + ' círculo a sua escolha (atributo-'
  + ' chave Carisma). Caso'
  + ' aprenda novamente essa'
  + ' magia, seu custo diminui'
  + ' em –1 PM.';

	constructor(readonly spell: SpellName) {
		super(RaceAbilityName.mysticTattoo);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new LearnSpell({
			payload: {
				source: this.source,
				spell: SpellFactory.make(this.spell),
				needsCircle: false,
			},
			transaction,
		}));
	}
}
