import {AddEquipment} from '../Action/AddEquipment';
import {Equipment} from '../Inventory/Equipment/Equipment';
import {EquipmentName} from '../Inventory/Equipment/EquipmentName';
import {LeatherArmor} from '../Inventory/Equipment/Weapon/DefensiveWeapon/LeatherArmor';
import {Dagger} from '../Inventory/Equipment/Weapon/OfensiveWeapon/Dagger';
import {LongSword} from '../Inventory/Equipment/Weapon/OfensiveWeapon/LongSword';
import {RoleFake} from '../Role/RoleFake';
import {BuildingSheetFake} from './BuildingSheetFake';
import {Proficiency} from './Proficiency';
import {SheetInitialEquipmentsAdder} from './SheetInitialEquipmentsAdder';

describe('SheetInitialEquipmentsAdder', () => {
	it('should add default initial equipments', () => {
		const adder = new SheetInitialEquipmentsAdder({
			simpleWeapon: new Dagger(),
		});

		const dispatch = jest.fn();
		const sheet = new BuildingSheetFake();
		const role = new RoleFake();
		role.startsWithArmor = false;
		adder.addEquipments(dispatch, sheet, role);

		expect(dispatch).toHaveBeenCalledWith(new AddEquipment({
			equipment: new Equipment(EquipmentName.backpack),
			source: 'default',
		}), sheet);

		expect(dispatch).toHaveBeenCalledWith(new AddEquipment({
			equipment: new Equipment(EquipmentName.sleepingBag),
			source: 'default',
		}), sheet);

		expect(dispatch).toHaveBeenCalledWith(new AddEquipment({
			equipment: new Equipment(EquipmentName.travelerCostume),
			source: 'default',
		}), sheet);
	});

	it('should require armor if role does not starts with it', () => {
		const adder = new SheetInitialEquipmentsAdder({
			simpleWeapon: new Dagger(),
		});

		const dispatch = jest.fn();
		const sheet = new BuildingSheetFake();
		const role = new RoleFake();

		expect(() => {
			adder.addEquipments(dispatch, sheet, role);
		}).toThrow('MISSING_ARMOR');
	});

	it('should add armor', () => {
		const adder = new SheetInitialEquipmentsAdder({
			simpleWeapon: new Dagger(),
			armor: new LeatherArmor(),
		});

		const dispatch = jest.fn();
		const sheet = new BuildingSheetFake();
		const role = new RoleFake();

		adder.addEquipments(dispatch, sheet, role);

		expect(dispatch).toHaveBeenCalledWith(new AddEquipment({
			equipment: new LeatherArmor(),
			source: 'default',
		}), sheet);
	});

	it('should require martial weapon if has proficiency', () => {
		const adder = new SheetInitialEquipmentsAdder({
			simpleWeapon: new Dagger(),
			armor: new LeatherArmor(),
		});

		const dispatch = jest.fn();
		const sheet = new BuildingSheetFake();
		sheet.proficiencies.push(Proficiency.martial);
		const role = new RoleFake();

		expect(() => {
			adder.addEquipments(dispatch, sheet, role);
		}).toThrow('MISSING_MARTIAL_WEAPON');
	});

	it('should add martial weapon if has proficiency', () => {
		const adder = new SheetInitialEquipmentsAdder({
			simpleWeapon: new Dagger(),
			martialWeapon: new LongSword(),
			armor: new LeatherArmor(),
		});

		const dispatch = jest.fn();
		const sheet = new BuildingSheetFake();
		sheet.proficiencies.push(Proficiency.martial);
		const role = new RoleFake();
		adder.addEquipments(dispatch, sheet, role);

		expect(dispatch).toHaveBeenCalledWith(new AddEquipment({
			equipment: new LongSword(),
			source: 'default',
		}), sheet);
	});
});
