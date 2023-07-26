import {PassiveEffect} from '../../Ability';
import {AddPerLevelModifierToManaPoints} from '../../Action/AddPerLevelModifierToManaPoints';
import {PerLevelModifier} from '../../Modifier';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class MagicBloodEffect extends PassiveEffect {
	override description = 'Você recebe +1 ponto de mana por nível.';

	constructor() {
		super(RaceAbilityName.magicBlood);
	}

	override apply(transaction: TransactionInterface): void {
		const modifier = new PerLevelModifier({
			source: this.source,
			value: 1,
		});
		transaction.run(new AddPerLevelModifierToManaPoints({
			payload: {
				modifier,
			},
			transaction,
		}));
	}
}
