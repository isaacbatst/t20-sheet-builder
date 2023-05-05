import {AddEquipment} from '../Action/AddEquipment';
import type {MartialWeapon} from '../Inventory/Equipment/Weapon/OffensiveWeapon/MartialWeapon/MartialWeapon';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {Proficiency} from './Proficiency';
import type {SheetInitialEquipmentsWeaponAdder, SheetInitialEquipmentsWeaponAdderType} from './SheetInitialEquipmentsAdder';
import type {Dispatch} from './Transaction';

export class SheetInitialEquipmentsMartialAdder implements SheetInitialEquipmentsWeaponAdder {
	type: SheetInitialEquipmentsWeaponAdderType = 'martial';

	constructor(
		readonly martialWeapon: MartialWeapon,
	) {}

	addEquipments(sheet: BuildingSheetInterface, dispatch: Dispatch) {
		if (!sheet.getProficiencies().includes(Proficiency.martial)) {
			throw new Error('UNEXPECTED_MARTIAL_WEAPON');
		}

		dispatch(new AddEquipment({equipment: this.martialWeapon, source: 'default'}), sheet);
	}
}
