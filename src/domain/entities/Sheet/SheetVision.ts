import {type SheetVisionInterface} from './SheetVisionInterface';
import {Vision} from './Vision';

export class SheetVision implements SheetVisionInterface {
	constructor(
		private vision: Vision = Vision.default,
	) {}

	changeVision(vision: Vision): void {
		this.vision = vision;
	}

	getVision(): Vision {
		return this.vision;
	}
}
