import {type Size} from '../Size';
import {type SizeName} from '../Size/SizeName';

export type SheetSizeInterface = {
	getSize(): SizeName;
	getOccupiedSpaceInMeters(): number;
	getManeuversModifier(): number;
	getFurtivityModifier(): number;
	changeSize(size: Size): void;
};
