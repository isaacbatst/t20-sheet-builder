import {PassiveEffect} from '../../../../../../Ability/PassiveEffect';
import {type TransactionInterface} from '../../../../../../Sheet/TransactionInterface';
import {RoleAbilityName} from '../../../../../RoleAbilityName';
import {type ArcanistLineageDraconicDamageType} from './ArcanistLineageDraconicDamageType';

export class ArcanistLineageDraconicDamageReductionEffect extends PassiveEffect {
	get description() {
		return 'Você recebe redução de dano 5 ao tipo escolhido';
	}

	constructor(readonly damageType: ArcanistLineageDraconicDamageType) {
		super(RoleAbilityName.arcanistSupernaturalLineage);
	}

	override apply(transaction: TransactionInterface): void {
		// Throw new Error('Method not implemented.');
	}
}
