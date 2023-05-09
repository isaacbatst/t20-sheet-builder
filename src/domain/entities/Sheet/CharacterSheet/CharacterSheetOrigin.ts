import {type OriginInterface} from '../../Origin/Origin';
import {type SheetOriginInterface} from '../SheetOriginInterface';

export class CharacterSheetOrigin implements SheetOriginInterface {
	constructor(
		private readonly origin: OriginInterface,
	) {

	}

	getOrigin(): OriginInterface {
		return this.origin;
	}
}
