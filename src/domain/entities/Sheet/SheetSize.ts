import {sizes, type Size} from '../Size/Size';
import {SizeName} from '../Size/SizeName';
import {type SheetSizeInterface} from './SheetSizeInterface';

export class SheetSize implements SheetSizeInterface {
	constructor(
		private readonly size: Size = sizes[SizeName.medium],
	) {}

	getSize(): SizeName {
		return this.size.name;
	}

	getOccupiedSpaceInMeters(): number {
		return this.size.occupiedSpaceInMeters;
	}

	getManeuversModifier(): number {
		return this.size.maneuversModifier;
	}

	getFurtivityModifier(): number {
		return this.size.furtivityModifier;
	}
}
