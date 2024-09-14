import {EquipmentName} from '../../../EquipmentName';

const fireArmWeaponNames = [
	EquipmentName.pistol,
	EquipmentName.musket,
] as const;

export type FireArmWeaponName = typeof fireArmWeaponNames[number];

export const isFireArmWeaponName = (name: string): name is FireArmWeaponName =>
	fireArmWeaponNames.includes(name as FireArmWeaponName);
