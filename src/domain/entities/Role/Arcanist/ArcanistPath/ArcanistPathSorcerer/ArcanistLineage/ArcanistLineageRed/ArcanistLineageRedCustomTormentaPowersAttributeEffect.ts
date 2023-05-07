import {PassiveEffect} from '../../../../../../Ability/PassiveEffect';
import {ChangeTormentaPowersAttribute} from '../../../../../../Action/ChangeTormentaPowersAttribute';
import {type Attribute} from '../../../../../../Sheet';
import {type SheetBaseInterface} from '../../../../../../Sheet/SheetBaseInterface';
import {type Dispatch} from '../../../../../../Sheet/Transaction';
import {RoleAbilityName} from '../../../../../RoleAbilityName';

export class ArcanistLineageRedCustomTormentaPowersAttributeEffect extends PassiveEffect {
	constructor(private readonly attribute: Attribute) {
		super(RoleAbilityName.arcanistSupernaturalLineage);
	}

	override applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new ChangeTormentaPowersAttribute({
			attribute: this.attribute,
			source: this.source,
		}), sheet);
	}
}
