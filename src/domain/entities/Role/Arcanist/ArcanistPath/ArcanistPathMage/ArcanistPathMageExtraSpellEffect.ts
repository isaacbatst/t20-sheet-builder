import {PassiveEffect} from '../../../../Ability/PassiveEffect';
import {LearnSpell} from '../../../../Action/AddSpell';
import {type TransactionInterface} from '../../../../Sheet/TransactionInterface';
import {type Spell} from '../../../../Spell';
import {RoleAbilityName} from '../../../RoleAbilityName';
import {ArcanistPathName} from '../ArcanistPath';

export class ArcanistPathMageExtraSpellEffect extends PassiveEffect {
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
