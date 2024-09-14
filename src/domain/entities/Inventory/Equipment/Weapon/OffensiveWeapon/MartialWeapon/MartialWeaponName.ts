import {EquipmentName} from '../../../EquipmentName';

const martialWeaponNames = [
	EquipmentName.longSword,
	EquipmentName.scythe,
	EquipmentName.hatchet,
	EquipmentName.scimitar,
	EquipmentName.foil,
	EquipmentName.battleAxe,
	EquipmentName.flail,
	EquipmentName.warHammer,
	EquipmentName.pickaxe,
	EquipmentName.trident,
	EquipmentName.halberd,
	EquipmentName.cutlass,
	EquipmentName.mountedSpear,
	EquipmentName.handAndaHalfSword,
	EquipmentName.longBow,
	EquipmentName.heavyCrossbow,
	EquipmentName.warAxe,
] as const;

export type MartialWeaponName = typeof martialWeaponNames[number];

export const isMartialWeaponName = (name: string): name is MartialWeaponName =>
	martialWeaponNames.includes(name as MartialWeaponName);
