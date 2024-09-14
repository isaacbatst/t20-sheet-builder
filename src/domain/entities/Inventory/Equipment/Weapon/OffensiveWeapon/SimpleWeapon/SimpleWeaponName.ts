import {EquipmentName} from '../../../EquipmentName';

const simpleWeaponNames = [
	EquipmentName.club,
	EquipmentName.dagger,
	EquipmentName.sickle,
	EquipmentName.shortSword,
	EquipmentName.spear,
	EquipmentName.mace,
	EquipmentName.staffStick,
	EquipmentName.pike,
	EquipmentName.baton,
	EquipmentName.assegai,
	EquipmentName.lightCrossbow,
	EquipmentName.sling,
	EquipmentName.shortbow,
	EquipmentName.horns,
] as const;

export type SimpleWeaponName = typeof simpleWeaponNames[number];

export const isSimpleWeaponName = (name: string): name is SimpleWeaponName =>
	simpleWeaponNames.includes(name as SimpleWeaponName);
