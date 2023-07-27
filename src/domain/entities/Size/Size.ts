import {SizeName} from './SizeName';

export type Size = {
	name: SizeName;
	occupiedSpaceInMeters: number;
	maneuversModifier: number;
	furtivityModifier: number;
};

export const sizes: Record<SizeName, Size> = {
	tiny: {
		furtivityModifier: 5,
		maneuversModifier: -5,
		name: SizeName.tiny,
		occupiedSpaceInMeters: 1.5,
	},
	small: {
		furtivityModifier: 2,
		maneuversModifier: -2,
		name: SizeName.small,
		occupiedSpaceInMeters: 1.5,
	},
	medium: {
		furtivityModifier: 0,
		maneuversModifier: 0,
		name: SizeName.medium,
		occupiedSpaceInMeters: 1.5,
	},
	large: {
		furtivityModifier: -2,
		maneuversModifier: 2,
		name: SizeName.large,
		occupiedSpaceInMeters: 3,
	},
	huge: {
		furtivityModifier: -5,
		maneuversModifier: 5,
		name: SizeName.huge,
		occupiedSpaceInMeters: 4.5,
	},
	colossal: {
		furtivityModifier: -10,
		maneuversModifier: 10,
		name: SizeName.colossal,
		occupiedSpaceInMeters: 9,
	},
};
