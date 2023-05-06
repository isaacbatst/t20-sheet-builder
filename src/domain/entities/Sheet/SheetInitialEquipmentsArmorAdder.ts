import {SheetBuilderError} from '../Error/SheetBuilderError';
import {AddEquipment} from '../Action/AddEquipment';
import {EquipmentName} from '../Inventory/Equipment/EquipmentName';
import type {Armor} from '../Inventory/Equipment/Weapon/DefensiveWeapon/Armor/Armor';
import type {RoleInterface} from '../Role/RoleInterface';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {Proficiency} from './Proficiency';
import type {SheetInitialEquipmentsWeaponAdder, SheetInitialEquipmentsWeaponAdderType} from './SheetInitialEquipmentsAdder';
import type {Dispatch} from './Transaction';

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
			throw new SheetBuilderError('UNEXPECTED_ARMOR');
		}
	}

	addEquipments(sheet: BuildingSheetInterface, dispatch: Dispatch) {
		if ((this.hasHeavyArmor(sheet) && !this.isArmorInHeavyAllowedList())) {
			throw new SheetBuilderError('INVALID_ARMOR');
		}

		if (!this.hasHeavyArmor(sheet) && !this.isArmorInRegularAllowedList()) {
			throw new SheetBuilderError('INVALID_ARMOR');
		}

		dispatch(new AddEquipment({equipment: this.armor, source: 'default'}), sheet);
	}

	private isArmorInHeavyAllowedList() {
		return SheetInitialEquipmentsArmorAdder.allowedArmorsWithHeavy.includes(this.armor.name);
	}

	private isArmorInRegularAllowedList() {
		return SheetInitialEquipmentsArmorAdder.regularAllowedArmors.includes(this.armor.name);
	}

	private hasHeavyArmor(sheet: BuildingSheetInterface) {
		return sheet.getProficiencies().includes(Proficiency.heavyArmor);
	}
}
