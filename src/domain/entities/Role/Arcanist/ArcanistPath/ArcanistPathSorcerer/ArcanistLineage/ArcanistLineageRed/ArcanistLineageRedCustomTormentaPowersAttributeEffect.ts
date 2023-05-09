import {PassiveEffect} from '../../../../../../Ability/PassiveEffect';
import {ChangeTormentaPowersAttribute} from '../../../../../../Action/ChangeTormentaPowersAttribute';
import {type Attribute} from '../../../../../../Sheet';
import {type TransactionInterface} from '../../../../../../Sheet/TransactionInterface';
import {RoleAbilityName} from '../../../../../RoleAbilityName';

export class ArcanistLineageRedCustomTormentaPowersAttributeEffect extends PassiveEffect {
	get description() {
		return 'Você pode perder outro atributo em vez de Carisma por poderes da Tormenta';
	}

	constructor(private readonly attribute: Attribute) {
		super(RoleAbilityName.arcanistSupernaturalLineage);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new ChangeTormentaPowersAttribute({
			payload: {
				attribute: this.attribute,
				source: this.source,
			},
			transaction,
		}));
	}
}
