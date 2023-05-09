import {PassiveEffect} from '../../../../../../Ability/PassiveEffect';
import {ChangeTormentaPowersAttribute} from '../../../../../../Action/ChangeTormentaPowersAttribute';
import {type Attribute} from '../../../../../../Sheet';
import {type TransactionInterface} from '../../../../../../Sheet/TransactionInterface';
import {RoleAbilityName} from '../../../../../RoleAbilityName';

export class ArcanistLineageRedCustomTormentaPowersAttributeEffect extends PassiveEffect {
	constructor(private readonly attribute: Attribute) {
		super(RoleAbilityName.arcanistSupernaturalLineage);
	}

	override applyToSheet(transaction: TransactionInterface): void {
		transaction.run(new ChangeTormentaPowersAttribute({
			payload: {
				attribute: this.attribute,
				source: this.source,
			},
			transaction,
		}));
	}
}
