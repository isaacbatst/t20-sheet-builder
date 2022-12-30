import {AddEquipment} from '../Action/AddEquipment';
import {EquipmentName} from '../Inventory/Equipment/EquipmentName';
import type {Armor} from '../Inventory/Equipment/Weapon/DefensiveWeapon/Armor';
import type {RoleInterface} from '../Role/RoleInterface';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {Proficiency} from './Proficiency';
import type {SheetInitialEquipmentsWeaponAdder, SheetInitialEquipmentsWeaponAdderType} from './SheetInitialEquipmentsAdder';

export type SheetInitialEquipmentsAdderParams = {
	armor: Armor;
};

export class SheetInitialEquipmentsArmorAdder implements SheetInitialEquipmentsWeaponAdder {
	static readonly regularAllowedArmors = [EquipmentName.leatherArmor, EquipmentName.studdedLeather];
	static readonly allowedArmorsWithHeavy = [EquipmentName.leatherArmor, EquipmentName.studdedLeather, EquipmentName.brunea];

	type: SheetInitialEquipmentsWeaponAdderType = 'armor';

	constructor(
		readonly armor: Armor, readonly role: RoleInterface,
	) {
		if (!this.role.startsWithArmor) {
			throw new Error('UNEXPECTED_ARMOR');
		}
	}

	addEquipments(sheet: BuildingSheetInterface) {
		if ((this.hasHeavyArmor(sheet) && !this.isArmorInHeavyAllowedList())
				|| (!this.hasHeavyArmor(sheet) && !this.isArmorInRegularAllowedList())) {
			throw new Error('INVALID_ARMOR');
		}

		sheet.initTransaction(new AddEquipment({equipment: this.armor, source: 'default'}));
	}

	private isArmorInHeavyAllowedList() {
		return SheetInitialEquipmentsArmorAdder.allowedArmorsWithHeavy.includes(this.armor.name);
	}

	private isArmorInRegularAllowedList() {
		return !SheetInitialEquipmentsArmorAdder.regularAllowedArmors.includes(this.armor.name);
	}

	private hasHeavyArmor(sheet: BuildingSheetInterface) {
		return sheet.getProficiencies().includes(Proficiency.heavyArmor);
	}
}
