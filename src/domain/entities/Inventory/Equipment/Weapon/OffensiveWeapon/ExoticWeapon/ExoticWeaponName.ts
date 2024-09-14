import {EquipmentName} from '../../../EquipmentName';

const exoticWeaponNames = [
	EquipmentName.whip,
	EquipmentName.bastardSword,
	EquipmentName.katana,
	EquipmentName.dwarfAxe,
	EquipmentName.chainofThorns,
	EquipmentName.tauricAxe,
] as const;

export type ExoticWeaponName = typeof exoticWeaponNames[number];

export const isExoticWeaponName = (name: string): name is ExoticWeaponName =>
	exoticWeaponNames.includes(name as ExoticWeaponName);
