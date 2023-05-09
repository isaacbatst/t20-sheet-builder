import {WeaponAttack} from '../Attack/WeaponAttack';
import {SheetBuilderError} from '../Error/SheetBuilderError';
import type {EquipmentName} from '../Inventory';
import {OffensiveWeapon} from '../Inventory/Equipment/Weapon/OffensiveWeapon/OffensiveWeapon';
import {type GeneralPowerMap} from '../Map';
import {FightStyle} from '../Power/GeneralPower/CombatPower/FightStyle/FightStyle';
import type {Attributes} from '../Sheet';
import type {CharacterSheet} from '../Sheet/CharacterSheet';
import type {CharacterAppliedFightStyle} from './CharacterAppliedFightStyle';
import {CharacterAttack} from './CharacterAttack';
import type {CharacterInterface} from './CharacterInterface';
import {CharacterModifiers} from './CharacterModifiers';

export class Character implements CharacterInterface {
	private get maxWieldedItems() {
		return 2;
	}

	private fightStyle: CharacterAppliedFightStyle | undefined;
	private readonly modifiers = new CharacterModifiers();

	constructor(
		private	readonly sheet: CharacterSheet,
	) {
		this.selectDefaultFightStyle(sheet.getSheetPowers().getGeneralPowers());
	}

	selectFightStyle(fightStyle: FightStyle) {
		const applied = fightStyle.applyModifiers(this.modifiers);
		this.fightStyle = applied;
	}

	unselectFightStyle() {
		this.fightStyle?.removeModifiers(this.modifiers);
		this.fightStyle = undefined;
	}

	toggleWieldItem(name: EquipmentName) {
		const inventory = this.sheet.getSheetInventory();
		const item = inventory.getItem(name);

		if (!item) {
			throw new SheetBuilderError('ITEM_NOT_FOUND');
		}

		const wieldedItems = inventory.getWieldedItems();

		if (!item.getIsEquipped() && this.maxWieldedItems <= wieldedItems.length) {
			throw new SheetBuilderError('MAX_WIELDED_ITEMS');
		}

		item.toggleEquipped();
	}

	getAttributes(): Attributes {
		const attributes = this.sheet.getSheetAttributes();
		return attributes.getValues();
	}

	getAttacks(): Map<EquipmentName, CharacterAttack> {
		const attacks = new Map<EquipmentName, CharacterAttack>();
		const inventory = this.sheet.getSheetInventory();
		const equipments = inventory.getEquipments();
		equipments.forEach(({equipment}) => {
			if (equipment instanceof OffensiveWeapon) {
				const attack = new CharacterAttack(
					new WeaponAttack(equipment),
					{
						contextual: this.modifiers.attack.contextual,
					},
				);
				attacks.set(equipment.name, attack);
			}
		});

		return attacks;
	}

	getWieldedItems(): EquipmentName[] {
		const inventory = this.sheet.getSheetInventory();
		return inventory.getWieldedItems();
	}

	getFightStyle(): CharacterAppliedFightStyle | undefined {
		return this.fightStyle;
	}

	private selectDefaultFightStyle(powers: GeneralPowerMap) {
		for (const power of powers.values()) {
			if (power instanceof FightStyle) {
				this.selectFightStyle(power);
				break;
			}
		}
	}
}
