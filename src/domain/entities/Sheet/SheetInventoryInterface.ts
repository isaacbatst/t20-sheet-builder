import {type CharacterModifiers} from '../Character/CharacterModifiers';
import {type MartialWeaponName, type SimpleWeaponName, type Armor, type Equipment, type EquipmentName, type MartialWeapon, type SimpleWeapon, type ArmorName} from '../Inventory/Equipment';
import {type InventoryEquipment} from '../Inventory/InventoryEquipment';
import {type RoleInterface} from '../Role';
import {type SerializedSheetEquipment, type SerializedSheetInventoryEquipment} from './SerializedSheet/SerializedSheetInterface';
import {type TransactionInterface} from './TransactionInterface';

export type AddInitialEquipmentParams = {
	role: RoleInterface;
	simpleWeapon: SimpleWeapon;
	martialWeapon?: MartialWeapon | undefined;
	armor?: Armor | undefined;
	money: number;
};

export type ToggleEquippedItemParams = {
	name: EquipmentName;
	modifiers: CharacterModifiers;
	maxWieldedItems: number;
};

export type SerializedInitialEquipment = {
	simpleWeapon?: SerializedSheetEquipment<SimpleWeaponName>;
	martialWeapon?: SerializedSheetEquipment<MartialWeaponName>;
	armor?: SerializedSheetEquipment<ArmorName>;
	money: number;
};

export type SheetInventoryInterface = {
	addEquipment(equipment: Equipment): void;
	addInitialEquipment(params: AddInitialEquipmentParams, transaction: TransactionInterface): void;
	addMoney(quantity: number): void;
	toggleEquippedItem({maxWieldedItems, modifiers, name}: ToggleEquippedItemParams): void;
	removeMoney(amount: number): void;
	getMoney(): number;

	getEquipment(name: EquipmentName): InventoryEquipment | undefined;
	getEquipments(): Map<EquipmentName, InventoryEquipment>;

	getWieldedItems(): EquipmentName[];
	getArmorBonus(): number;
	getShieldBonus(): number;
	serialize(): SerializedSheetInventoryEquipment[];
	serializeInitialEquipment(): SerializedInitialEquipment | undefined;
};
