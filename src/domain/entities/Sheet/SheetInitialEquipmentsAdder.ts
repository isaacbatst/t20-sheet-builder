import {AddEquipment} from '../Action/AddEquipment';
import {Equipment} from '../Inventory/Equipment/Equipment';
import {EquipmentName} from '../Inventory/Equipment/EquipmentName';
import type {Armor} from '../Inventory/Equipment/Weapon/DefensiveWeapon/Armor';
import type {MartialWeapon} from '../Inventory/Equipment/Weapon/OfensiveWeapon/MartialWeapon';
import type {SimpleWeapon} from '../Inventory/Equipment/Weapon/OfensiveWeapon/SimpleWeapon';
import type {RoleInterface} from '../Role/RoleInterface';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {Proficiency} from './Proficiency';
import {SheetInitialEquipmentsArmorAdder} from './SheetInitialEquipmentsArmorAdder';
import {SheetInitialEquipmentsMartialAdder} from './SheetInitialEquipmentsMartialAdder';

export type SheetInitialEquipmentsWeaponAdderType = 'martial' | 'armor';

export type SheetInitialEquipmentsWeaponAdder = {
	type: SheetInitialEquipmentsWeaponAdderType;
	addEquipments(sheet: BuildingSheetInterface): void;
};

export type SheetInitialEquipmentsAdderParams = {
	simpleWeapon: SimpleWeapon;
	martialWeapon?: MartialWeapon;
	armor?: Armor;
};

export class SheetInitialEquipmentsAdder {
	readonly simpleWeapon: SimpleWeapon;
	readonly martialWeapon?: MartialWeapon;
	readonly armor?: Armor;

	constructor(
		params: SheetInitialEquipmentsAdderParams,
	) {
		this.simpleWeapon = params.simpleWeapon;
		this.martialWeapon = params.martialWeapon;
		this.armor = params.armor;
	}

	addEquipments(sheet: BuildingSheetInterface, role: RoleInterface) {
		this.validateWeapons(sheet, role);

		sheet.initTransaction(new AddEquipment({equipment: new Equipment(EquipmentName.backpack), source: 'default'}));
		sheet.initTransaction(new AddEquipment({equipment: new Equipment(EquipmentName.sleepingBag), source: 'default'}));
		sheet.initTransaction(new AddEquipment({equipment: new Equipment(EquipmentName.travelerCostume), source: 'default'}));
		sheet.initTransaction(new AddEquipment({equipment: this.simpleWeapon, source: 'default'}));

		if (this.martialWeapon) {
			const adder = new SheetInitialEquipmentsMartialAdder(this.martialWeapon);
			adder.addEquipments(sheet);
		}

		if (this.armor) {
			const adder = new SheetInitialEquipmentsArmorAdder(this.armor, role);
			adder.addEquipments(sheet);
		}
	}

	validateWeapons(sheet: BuildingSheetInterface, role: RoleInterface) {
		if (sheet.getProficiencies().includes(Proficiency.martial) && !this.martialWeapon) {
			throw new Error('MISSING_MARTIAL_WEAPON');
		}

		if (role.startsWithArmor && !this.armor) {
			throw new Error('MISSING_ARMOR');
		}
	}
}
