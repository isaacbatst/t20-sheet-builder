import {type ContextInterface} from '../../Context/ContextInterface';
import {type SheetInterface} from '../SheetInterface';
import {type SerializedSheetInterface} from './SerializedSheetInterface';

/**
* @deprecated Use `sheet.serialize()` instead
*/
export class SheetSerializer {
	constructor(
		private readonly context: ContextInterface,
	) {}

	serialize(sheet: SheetInterface): SerializedSheetInterface {
		return sheet.serialize(this.context);
	}
}
