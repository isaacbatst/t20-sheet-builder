import {PassiveEffect} from '../../../../../Ability/PassiveEffect';
import {PickGeneralPower} from '../../../../../Action/PickGeneralPower';
import {type TormentaPower} from '../../../../../Power/GeneralPower/TormentaPower/TormentaPower';
import {type SheetBaseInterface} from '../../../../../Sheet/SheetBaseInterface';
import {type Dispatch} from '../../../../../Sheet/Transaction';
import {RoleAbilityName} from '../../../../RoleAbilityName';

export class ArcanistLineageRedExtraTormentaPowerEffect extends PassiveEffect {
	constructor(
		private readonly power: TormentaPower,
	) {
		super(RoleAbilityName.arcanistSupernaturalLineage);
	}

	applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new PickGeneralPower({
			power: this.power,
			source: this.source,
		}), sheet);
	}
}
