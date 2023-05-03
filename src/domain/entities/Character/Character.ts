import {WeaponAttack} from '../Attack/WeaponAttack';
import type {EquipmentName} from '../Inventory';
import {OffensiveWeapon} from '../Inventory/Equipment/Weapon/OfensiveWeapon/OffensiveWeapon';
import {FightStyle} from '../Power/GeneralPower/FightStyle/FightStyle';
import type {Attributes} from '../Sheet';
import type {Sheet} from '../Sheet/Sheet';
import type {CharacterAppliedFightStyle} from './CharacterAppliedFightStyle';
import {CharacterAttack} from './CharacterAttack';
import {CharacterModifiers} from './CharacterModifiers';

export class Character {
	private get maxWieldedItems() {
		return 2;
	}

	private fightStyle: CharacterAppliedFightStyle | undefined;
	private readonly modifiers = new CharacterModifiers();

	constructor(
		private	readonly sheet: Sheet,
	) {
		this.selectDefaultFightStyle(sheet);
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
		const item = this.sheet.inventory.getItem(name);

		if (!item) {
			throw new Error('ITEM_NOT_FOUND');
		}

		const wieldedItems = this.sheet.inventory.getWieldedItems();

		if (!item.getIsEquipped() && this.maxWieldedItems >= wieldedItems.length) {
			throw new Error('MAX_WIELDED_ITEMS');
		}

		item.toggleEquipped();
	}

	getAttributes(): Attributes {
		return this.sheet.attributes;
	}

	getAttacks(): Map<EquipmentName, CharacterAttack> {
		const attacks = new Map<EquipmentName, CharacterAttack>();

		this.sheet.inventory.equipments.forEach(({equipment}) => {
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
		return this.sheet.inventory.getWieldedItems();
	}

	getFightStyle(): CharacterAppliedFightStyle | undefined {
		return this.fightStyle;
	}

	private selectDefaultFightStyle(sheet: Sheet) {
		for (const power of sheet.powers.general.values()) {
			if (power instanceof FightStyle) {
				this.selectFightStyle(power);
				break;
			}
		}
	}
}
