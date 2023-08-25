import {SheetBuilderError} from '../../errors';
import {AddEquipment} from '../Action/AddEquipment';
import {AddMoney} from '../Action/AddMoney';
import {type Armor, EquipmentName, type MartialWeapon, type SimpleWeapon, type Equipment} from '../Inventory';
import {EquipmentAdventure} from '../Inventory/Equipment/EquipmentAdventure/EquipmentAdventure';
import {LightShield} from '../Inventory/Equipment/Weapon/DefensiveWeapon/Shield/LightShield';
import {Inventory} from '../Inventory/Inventory';
import {type InventoryEquipment} from '../Inventory/InventoryEquipment';
import {Proficiency} from './Proficiency';
import {type SerializedSheetInventoryEquipment} from './SerializedSheet';
import {type SerializedInitialEquipment, type AddInitialEquipmentParams, type SheetInventoryInterface, type ToggleEquippedItemParams} from './SheetInventoryInterface';
import {type SheetProficienciesInterface} from './SheetProficienciesInterface';
import {type TransactionInterface} from './TransactionInterface';

export class SheetInventory implements SheetInventoryInterface {
	static readonly initialArmors = new Set([EquipmentName.leatherArmor, EquipmentName.studdedLeather]);
	static readonly initialArmorsForHeavyProficients = new Set([EquipmentName.leatherArmor, EquipmentName.studdedLeather, EquipmentName.brunea]);

	private initialEquipment?: {
		simpleWeapon: SimpleWeapon;
		martialWeapon?: MartialWeapon;
		armor?: Armor;
		money: number;
	};

	constructor(
		private readonly inventory: Inventory = new Inventory(),
	) {}

	serializeInitialEquipment(): SerializedInitialEquipment | undefined {
		if (!this.initialEquipment) {
			return;
		}

		return {
			simpleWeapon: this.initialEquipment.simpleWeapon.serialize(),
			martialWeapon: this.initialEquipment.martialWeapon?.serialize(),
			armor: this.initialEquipment.armor?.serialize(),
			money: this.initialEquipment.money,
		};
	}

	serialize(): SerializedSheetInventoryEquipment[] {
		const equipments: SerializedSheetInventoryEquipment[] = [];
		this.getEquipments().forEach(inventoryEquipment => {
			equipments.push(inventoryEquipment.serialize());
		});

		return equipments;
	}

	getArmorBonus(): number {
		return this.getArmor()?.equipment.defenseBonus ?? 0;
	}

	getShieldBonus(): number {
		return this.getShield()?.equipment.defenseBonus ?? 0;
	}

	toggleEquippedItem({maxWieldedItems, modifiers, name}: ToggleEquippedItemParams): void {
		const item = this.getItem(name);

		if (!item) {
			throw new SheetBuilderError('ITEM_NOT_FOUND');
		}

		const wieldedItems = this.getWieldedItems();

		if (item.equipment.isWieldable && !item.getIsEquipped() && maxWieldedItems <= wieldedItems.length) {
			throw new SheetBuilderError('MAX_WIELDED_ITEMS');
		}

		item.toggleEquipped(modifiers);
	}

	addEquipment(equipment: Equipment): void {
		this.inventory.addEquipment(equipment);
	}

	addInitialEquipment(params: AddInitialEquipmentParams, transaction: TransactionInterface): void {
		this.validateInitialWeapons(params, transaction.sheet.getSheetProficiencies());
		this.initialEquipment = params;
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

		if (params.role.proficiencies.includes(Proficiency.shield)) {
			transaction.run(new AddEquipment({payload: {equipment: new LightShield(), source}, transaction}));
		}

		transaction.run(new AddMoney({payload: {quantity: params.money, source}, transaction}));
	}

	getArmor() {
		return this.inventory.getArmor();
	}

	getShield() {
		return this.inventory.getShield();
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

		if (!params.role.startsWithArmor && params.armor) {
			throw new SheetBuilderError('UNEXPECTED_ARMOR');
		}

		if (params.armor) {
			const hasHeavyArmorProficiency = proficiencies.has(Proficiency.heavyArmor);
			const allowedArmors = hasHeavyArmorProficiency
				? SheetInventory.initialArmorsForHeavyProficients
				: SheetInventory.initialArmors;

			if (!allowedArmors.has(params.armor.name)) {
				throw new SheetBuilderError('INVALID_CHOOSED_ARMOR');
			}
		}
	}
}
