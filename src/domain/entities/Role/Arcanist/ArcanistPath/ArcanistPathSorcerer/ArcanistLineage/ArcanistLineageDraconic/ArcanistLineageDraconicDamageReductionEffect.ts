import {PassiveEffect} from '../../../../../../Ability/PassiveEffect';
import {type TransactionInterface} from '../../../../../../Sheet/TransactionInterface';
import {RoleAbilityName} from '../../../../../RoleAbilityName';
import {type ArcanistLineageDraconicDamageType} from './ArcanistLineageDraconicDamageType';

export class ArcanistLineageDraconicDamageReductionEffect extends PassiveEffect {
	constructor(private readonly damageType: ArcanistLineageDraconicDamageType) {
		super(RoleAbilityName.arcanistSupernaturalLineage);
	}

	override applyToSheet(transaction: TransactionInterface): void {
		throw new Error('Method not implemented.');
	}
}
