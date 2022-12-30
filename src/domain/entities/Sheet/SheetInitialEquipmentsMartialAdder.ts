import {AddEquipment} from '../Action/AddEquipment';
import type {MartialWeapon} from '../Inventory/Equipment/Weapon/OfensiveWeapon/MartialWeapon';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {Proficiency} from './Proficiency';
import type {SheetInitialEquipmentsWeaponAdder, SheetInitialEquipmentsWeaponAdderType} from './SheetInitialEquipmentsAdder';

export class SheetInitialEquipmentsMartialAdder implements SheetInitialEquipmentsWeaponAdder {
	type: SheetInitialEquipmentsWeaponAdderType = 'martial';

	constructor(
		readonly martialWeapon: MartialWeapon,
	) {}

	addEquipments(sheet: BuildingSheetInterface) {
		if (!sheet.getProficiencies().includes(Proficiency.martial)) {
			throw new Error('UNEXPECTED_MARTIAL_WEAPON');
		}

		sheet.initTransaction(new AddEquipment({equipment: this.martialWeapon, source: 'default'}));
	}
}
