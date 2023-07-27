import {type SizeName} from '../Size/SizeName';

export type SheetSizeInterface = {
	getSize(): SizeName;
	getOccupiedSpaceInMeters(): number;
	getManeuversModifier(): number;
	getFurtivityModifier(): number;
};
