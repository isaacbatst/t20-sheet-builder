import {AddEquipment} from '../Action/AddEquipment';
import {AddMoney} from '../Action/AddMoney';
import {SheetBuilderError} from '../Error';
import {EquipmentName, type Equipment} from '../Inventory';
import {EquipmentAdventure} from '../Inventory/Equipment/EquipmentAdventure/EquipmentAdventure';
import {Inventory} from '../Inventory/Inventory';
import {type InventoryEquipment} from '../Inventory/InventoryEquipment';
import {Translatable} from '../Translatable';
import {Proficiency} from './Proficiency';
import {type AddInitialEquipmentParams, type SheetInventoryInterface} from './SheetInventoryInterface';
import {type SheetProficienciesInterface} from './SheetProficienciesInterface';
import {type TransactionInterface} from './TransactionInterface';

export class SheetInventory implements SheetInventoryInterface {
	static readonly initialArmors = new Set([EquipmentName.leatherArmor, EquipmentName.studdedLeather]);
	static readonly initialArmorsForHeavyProficients = new Set([EquipmentName.leatherArmor, EquipmentName.studdedLeather, EquipmentName.brunea]);

	constructor(
		private readonly inventory: Inventory = new Inventory(),
	) {}

	getArmorBonus(): number {
		return 0;
	}

	getShieldBonus(): number {
		return 0;
	}

	toggleEquippedItem(name: EquipmentName): void {
		this.inventory.toggleEquippedItem(name);
	}

	addEquipment(equipment: Equipment): void {
		this.inventory.addEquipment(equipment);
	}

	addInitialEquipment(params: AddInitialEquipmentParams, transaction: TransactionInterface): void {
		this.validateInitialWeapons(params, transaction.sheet.getSheetProficiencies());
		const source = 'default';
		transaction.run(new AddEquipment({payload: {equipment: new EquipmentAdventure(EquipmentName.backpack), source}, transaction}));
		transaction.run(new AddEquipment({payload: {equipment: new EquipmentAdventure(EquipmentName.travelerCostume), source}, transaction}));
		transaction.run(new AddEquipment({payload: {equipment: new EquipmentAdventure(EquipmentName.sleepingBag), source}, transaction}));
		transaction.run(new AddEquipment({payload: {equipment: params.simpleWeapon, source}, transaction}));

		if (params.martialWeapon) {
			transaction.run(new AddEquipment({payload: {equipment: params.martialWeapon, source}, transaction}));
		}

		if (params.armor) {
			transaction.run(new AddEquipment({payload: {equipment: params.armor, source}, transaction}));
		}

		transaction.run(new AddMoney({payload: {quantity: params.money, source}, transaction}));
	}

	addMoney(quantity: number): void {
		this.inventory.addMoney(quantity);
	}

	removeMoney(quantity: number): void {
		this.inventory.removeMoney(quantity);
	}

	getMoney(): number {
		return this.inventory.getMoney();
	}

	getItem(name: EquipmentName): InventoryEquipment | undefined {
		return this.inventory.getItem(name);
	}

	getWieldedItems(): EquipmentName[] {
		return this.inventory.getWieldedItems();
	}

	getEquipments() {
		return this.inventory.getEquipments();
	}

	private validateInitialWeapons(params: AddInitialEquipmentParams, proficiencies: SheetProficienciesInterface) {
		const hasMartialProficiency = proficiencies.has(Proficiency.martial);
		if (hasMartialProficiency && !params.martialWeapon) {
			throw new SheetBuilderError('MISSING_MARTIAL_WEAPON');
		}

		if (!hasMartialProficiency && params.martialWeapon) {
			throw new SheetBuilderError('UNEXPECTED_MARTIAL_WEAPON');
		}

		if (params.role.startsWithArmor && !params.armor) {
			throw new SheetBuilderError('MISSING_ARMOR');
		}

		if (params.armor) {
			if (!params.role.startsWithArmor) {
				throw new SheetBuilderError('UNEXPECTED_ARMOR');
			}

			const hasHeavyArmorProficiency = proficiencies.has(Proficiency.heavyArmor);
			const allowedArmors = hasHeavyArmorProficiency ? SheetInventory.initialArmorsForHeavyProficients : SheetInventory.initialArmors;

			if (!allowedArmors.has(params.armor.name)) {
				throw new SheetBuilderError('INVALID_ARMOR');
			}
		}
	}
}
