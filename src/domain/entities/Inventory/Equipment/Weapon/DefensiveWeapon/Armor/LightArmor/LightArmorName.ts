import {EquipmentName} from '../../../../EquipmentName';

export const lightArmorNames = [
	EquipmentName.leatherArmor,
	EquipmentName.studdedLeather,
] as const;

export type LightArmorName = typeof lightArmorNames[number];

export const isLightArmorName = (name: string): name is LightArmorName =>
	lightArmorNames.includes(name as LightArmorName);
