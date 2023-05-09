import {SheetBuilderError} from '../Error';
import {type SheetDisplacementInterface} from './SheetDisplacementInterface';

export class SheetDisplacement implements SheetDisplacementInterface {
	constructor(
		private displacement = 9,
	) {}

	changeDisplacement(displacement: number): void {
		if (displacement < 0) {
			throw new SheetBuilderError('DISPLACEMENT_CANNOT_BE_NEGATIVE');
		}

		this.displacement = displacement;
	}

	getDisplacement(): number {
		return this.displacement;
	}
}
