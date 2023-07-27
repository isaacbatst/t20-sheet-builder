import {sizes, type Size} from '../Size/Size';
import {SizeName} from '../Size/SizeName';
import {type SheetSizeInterface} from './SheetSizeInterface';

export class SheetSize implements SheetSizeInterface {
	constructor(
		private size: Size = sizes[SizeName.medium],
	) {}

	changeSize(size: Size): void {
		this.size = size;
	}

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
