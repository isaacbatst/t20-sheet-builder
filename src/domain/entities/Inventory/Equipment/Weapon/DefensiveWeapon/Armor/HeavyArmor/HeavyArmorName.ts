import {EquipmentName} from '../../../../EquipmentName';

const heavyArmorNames = [
	EquipmentName.fullPlate,
	EquipmentName.chainMail,
	EquipmentName.brunea,
] as const;

export type HeavyArmorName = typeof heavyArmorNames[number];

export const isHeavyArmorName = (name: string): name is HeavyArmorName =>
	heavyArmorNames.includes(name as HeavyArmorName);
