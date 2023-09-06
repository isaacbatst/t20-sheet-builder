import {Armor, type EquipmentName} from './Equipment';
import type {Equipment} from './Equipment/Equipment';
import {Shield} from './Equipment/Weapon/DefensiveWeapon/Shield/Shield';
import {InventoryEquipment} from './InventoryEquipment';

export class Inventory {
	equipments = new Map<EquipmentName, InventoryEquipment>();
	money = 0;

	addEquipment(equipment: Equipment, isEquipped = false) {
		if (this.equipments.has(equipment.name)) {
			this.equipments.get(equipment.name)?.increaseQuantity();
		} else {
			this.equipments.set(equipment.name, new InventoryEquipment(equipment, isEquipped));
		}
	}

	addMoney(amount: number) {
		this.money += amount;
	}

	removeMoney(amount: number) {
		this.money -= amount;
	}

	getItem(name: EquipmentName) {
		return this.equipments.get(name);
	}

	getEquipments() {
		return this.equipments;
	}

	getArmor(): InventoryEquipment<Armor> | undefined {
		const found = [...this.equipments.values()].find(item => item.getIsEquipped() && item.equipment instanceof Armor);
		return found as InventoryEquipment<Armor> | undefined;
	}

	getShield(): InventoryEquipment<Shield> | undefined {
		const found = [...this.equipments.values()].find(item => item.getIsEquipped() && item.equipment instanceof Shield);
		return found as InventoryEquipment<Shield> | undefined;
	}

	getWieldedItems(): EquipmentName[] {
		return Array.from(this.equipments.values())
			.filter(item => item.getIsEquipped() && item.equipment.isWieldable)
			.map(item => item.equipment.name);
	}

	getMoney(): number {
		return this.money;
	}
}
