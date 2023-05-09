import {type Armor, type Equipment, type EquipmentName, type MartialWeapon, type SimpleWeapon} from '../Inventory/Equipment';
import {type InventoryEquipment} from '../Inventory/InventoryEquipment';
import {type RoleInterface} from '../Role';
import {type TransactionInterface} from './TransactionInterface';

export type AddInitialEquipmentParams = {
	role: RoleInterface;
	simpleWeapon: SimpleWeapon;
	martialWeapon?: MartialWeapon | undefined;
	armor?: Armor | undefined;
	money: number;
};

export type SheetInventoryInterface = {
	addEquipment(equipment: Equipment): void;
	addInitialEquipment(params: AddInitialEquipmentParams, transaction: TransactionInterface): void;
	addMoney(quantity: number): void;
	toggleEquippedItem(name: EquipmentName): void;
	removeMoney(amount: number): void;
	getMoney(): number;

	getItem(name: EquipmentName): InventoryEquipment | undefined;
	getEquipments(): Map<EquipmentName, InventoryEquipment>;

	getWieldedItems(): EquipmentName[];

};
