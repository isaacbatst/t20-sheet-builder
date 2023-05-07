import {PassiveEffect} from '../../../../../Ability/PassiveEffect';
import {type SheetBaseInterface} from '../../../../../Sheet/SheetBaseInterface';
import {type Dispatch} from '../../../../../Sheet/Transaction';
import {RoleAbilityName} from '../../../../RoleAbilityName';
import {type ArcanistLineageDraconicDamageType} from './ArcanistLineageDraconicDamageType';

export class ArcanistLineageDraconicDamageReductionEffect extends PassiveEffect {
	constructor(private readonly damageType: ArcanistLineageDraconicDamageType) {
		super(RoleAbilityName.arcanistSupernaturalLineage);
	}

	override applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		throw new Error('Method not implemented.');
	}
}
