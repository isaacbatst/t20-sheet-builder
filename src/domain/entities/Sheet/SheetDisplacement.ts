import {SheetBuilderError} from '../../errors';
import {type SheetDisplacementInterface} from './SheetDisplacementInterface';

export class SheetDisplacement implements SheetDisplacementInterface {
	private climbingDisplacement: number | undefined = undefined;

	constructor(
		private displacement = 9,
	) {}

	changeDisplacement(displacement: number): void {
		if (displacement < 0) {
			throw new SheetBuilderError('DISPLACEMENT_CANNOT_BE_NEGATIVE');
		}

		this.displacement = displacement;
	}

	changeClimbingDisplacement(climbingDisplacement: number): void {
		if (climbingDisplacement < 0) {
			throw new SheetBuilderError('CLIMBING_DISPLACEMENT_CANNOT_BE_NEGATIVE');
		}

		this.climbingDisplacement = climbingDisplacement;
	}

	getDisplacement(): number {
		return this.displacement;
	}

	getClimbingDisplacement(): number | undefined {
		return this.climbingDisplacement;
	}
}
