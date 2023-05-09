import {type OriginInterface} from '../Origin/Origin';
import {type SheetOriginInterface} from './SheetOriginInterface';

export class SheetOriginFake implements SheetOriginInterface {
	chooseOrigin = vi.fn();
	constructor(
		public origin: OriginInterface | undefined = undefined,
	) {}

	getOrigin(): OriginInterface | undefined {
		return this.origin;
	}
}
