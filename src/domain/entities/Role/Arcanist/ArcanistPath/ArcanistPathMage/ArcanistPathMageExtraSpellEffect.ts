import {PassiveEffect} from '../../../../Ability/PassiveEffect';
import {LearnSpell} from '../../../../Action/LearnSpell';
import {type TransactionInterface} from '../../../../Sheet/TransactionInterface';
import {type Spell} from '../../../../Spell';
import {RoleAbilityName} from '../../../RoleAbilityName';
import {ArcanistPathName} from '../ArcanistPath';

export class ArcanistPathMageExtraSpellEffect extends PassiveEffect {
	get description() {
		return 'Você começa com uma magia adicional (para um total de 4)';
	}

	constructor(readonly spell: Spell) {
		super(RoleAbilityName.arcanistPath);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new LearnSpell({
			payload: {
				source: ArcanistPathName.mage,
				spell: this.spell,
			},
			transaction,
		}));
	}
}
