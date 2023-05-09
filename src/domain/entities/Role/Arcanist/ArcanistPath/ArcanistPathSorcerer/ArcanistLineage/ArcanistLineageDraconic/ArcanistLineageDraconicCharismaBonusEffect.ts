import {PassiveEffect} from '../../../../../../Ability/PassiveEffect';
import {AddFixedModifierToLifePoints} from '../../../../../../Action/AddFixedModifierToLifePoints';
import {FixedModifier} from '../../../../../../Modifier/FixedModifier/FixedModifier';
import {type TransactionInterface} from '../../../../../../Sheet/TransactionInterface';
import {RoleAbilityName} from '../../../../../RoleAbilityName';

export class ArcanistLineageDraconicCharismaBonusEffect extends PassiveEffect {
	get description() {
		return 'Você soma seu Carisma em seus pontos de vida iniciais';
	}

	constructor() {
		super(RoleAbilityName.arcanistSupernaturalLineage);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new AddFixedModifierToLifePoints({
			payload: {
				modifier: new FixedModifier(this.source, 0, new Set(['charisma'])),
			},
			transaction,
		}));
	}
}
