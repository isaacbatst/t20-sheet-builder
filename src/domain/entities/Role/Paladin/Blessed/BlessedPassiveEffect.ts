import {PassiveEffect} from '../../../Ability';
import {AddFixedModifierToManaPoints} from '../../../Action/AddFixedModifierToManaPoints';
import {ChangeGrantPowersCount} from '../../../Action/ChangeGrantPowersCount';
import {FixedModifier} from '../../../Modifier';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RoleAbilityName} from '../../RoleAbilityName';

export class BlessedPassiveEffect extends PassiveEffect {
	override description: string = 'Você soma seu Carisma no seu'
  + ' total de pontos de mana no 1º nível.';

	constructor() {
		super(RoleAbilityName.blessed);
	}

	override apply(transaction: TransactionInterface): void {
		const modifier = new FixedModifier(RoleAbilityName.blessed, 0, new Set(['charisma']));
		transaction.run(new AddFixedModifierToManaPoints({
			payload: {
				modifier,
			},
			transaction,
		}));
		transaction.run(new ChangeGrantPowersCount({
			payload: {
				count: 2,
				source: this.source,
			},
			transaction,
		}));
	}
}
