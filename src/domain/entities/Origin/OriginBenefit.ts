import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Dispatch} from '../Sheet/Transaction';
import type {Translatable} from '../Translator';
import type {OriginBenefits} from './Origin';

export abstract class OriginBenefit {
	abstract addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable): void;
	abstract validate(originBenefits: OriginBenefits): void;
}
