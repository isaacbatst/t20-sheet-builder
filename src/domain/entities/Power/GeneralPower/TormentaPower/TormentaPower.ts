import {DecreaseAttribute} from '../../../Action/DecreaseAttribute';
import {type SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import {type Dispatch} from '../../../Sheet/Transaction';
import {type Translatable} from '../../../Translator';
import {GeneralPower} from '../GeneralPower';
import {GeneralPowerGroup} from '../GeneralPowerGroup';
import {type GeneralPowerName} from '../GeneralPowerName';

export abstract class TormentaPower extends GeneralPower {
	override group: GeneralPowerGroup = GeneralPowerGroup.tormenta;

	override addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable): void {
		super.addToSheet(sheet, dispatch, source);
		dispatch(new DecreaseAttribute({
			attribute: sheet.getTormentaPowersAttribute(),
			quantity: 1,
			source: this.name,
		}), sheet);
	}
}
