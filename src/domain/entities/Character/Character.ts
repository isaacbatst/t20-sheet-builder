import {type Context} from '../Context';
import {OffensiveWeapon, type EquipmentName} from '../Inventory';
import {type GeneralPowerMap} from '../Map';
import {ContextualModifierAppliableValueCalculator, ContextualModifiersListTotalCalculator, FixedModifiersListTotalCalculator, PerLevelModifiersListTotalCalculator, type ContextualModifier, type ModifiersTotalCalculators} from '../Modifier';
import {type ModifiersMaxTotalCalculators} from '../Modifier/Modifiers';
import {FightStyle} from '../Power/GeneralPower/CombatPower/FightStyle/FightStyle';
import {Random, type RandomInterface} from '../Random';
import {type Attributes, type CharacterSheetInterface, type SerializedSheetGeneralPower, type SerializedSheetInterface} from '../Sheet';
import {SheetBuilder} from '../Sheet/SheetBuilder';
import {SkillTotalCalculatorFactory} from '../Skill/SkillTotalCalculatorFactory';
import type {CharacterAppliedFightStyle} from './CharacterAppliedFightStyle';
import {CharacterAttack, type SerializedCharacterAttack} from './CharacterAttack';
import type {CharacterInterface} from './CharacterInterface';
import {CharacterModifiers, type SerializedCharacterModifiers} from './CharacterModifiers';

export type SerializedCharacter = {
	sheet: SerializedSheetInterface;
	attacks?: SerializedCharacterAttack[];
	modifiers?: SerializedCharacterModifiers;
	fightStyle?: SerializedSheetGeneralPower;
	maxWieldedItems?: number;
};

export class Character implements CharacterInterface {
	static makeFromSerialized(serialized: SerializedCharacter): Character {
		const sheet = SheetBuilder.makeFromSerialized(serialized.sheet);
		return new Character(sheet);
	}

	private get maxWieldedItems() {
		return 2;
	}

	readonly modifiers = new CharacterModifiers();
	private fightStyle: CharacterAppliedFightStyle | undefined;

	constructor(
		readonly sheet: CharacterSheetInterface,
	) {
		this.selectDefaultFightStyle(sheet.getSheetPowers().getGeneralPowers());
	}

	attack(attack: CharacterAttack, random: RandomInterface = new Random()) {
		return attack.roll(random);
	}

	selectFightStyle(fightStyle: FightStyle) {
		const applied = fightStyle.applyModifiers(this.modifiers);
		this.fightStyle = applied;
	}

	unselectFightStyle() {
		this.fightStyle?.removeModifiers(this.modifiers);
		this.fightStyle = undefined;
	}

	toggleEquipItem(name: EquipmentName) {
		const inventory = this.sheet.getSheetInventory();
		inventory.toggleEquippedItem({
			maxWieldedItems: this.maxWieldedItems,
			modifiers: this.modifiers,
			name,
		});
	}

	getContextualModifierAppliableValue(modifier: ContextualModifier, context: Context) {
		const calculator = new ContextualModifierAppliableValueCalculator(this.getAttributes(), context, modifier);
		return modifier.getAppliableValue(calculator);
	}

	getAttributes(): Attributes {
		const attributes = this.sheet.getSheetAttributes();
		return attributes.getValues();
	}

	getAttacks(context: Context): Map<EquipmentName, CharacterAttack> {
		const attacks = new Map<EquipmentName, CharacterAttack>();
		const inventory = this.sheet.getSheetInventory();
		const equipments = inventory.getEquipments();
		equipments.forEach(({equipment}) => {
			if (equipment instanceof OffensiveWeapon) {
				const typedEquipment = equipment as OffensiveWeapon;
				const attack = this.makeAttack(typedEquipment, context);
				attacks.set(typedEquipment.name, attack);
			}
		});

		return attacks;
	}

	getAttack(weaponName: EquipmentName, context: Context) {
		const inventory = this.sheet.getSheetInventory();
		const weapon = inventory.getEquipment(weaponName);
		if (!weapon || !(weapon.equipment instanceof OffensiveWeapon)) {
			throw new Error('INVALID_EQUIPMENT');
		}

		const typedWeapon = weapon.equipment as OffensiveWeapon;

		return this.makeAttack(typedWeapon, context);
	}

	getWieldedItems(): EquipmentName[] {
		const inventory = this.sheet.getSheetInventory();
		return inventory.getWieldedItems();
	}

	getFightStyle(): CharacterAppliedFightStyle | undefined {
		return this.fightStyle;
	}

	serialize(context: Context): SerializedCharacter {
		const attacks: SerializedCharacterAttack[] = [];

		for (const attack of this.getAttacks(context).values()) {
			attacks.push(attack.serialize(this.sheet, context));
		}

		return {
			sheet: this.sheet.serialize(),
			modifiers: this.modifiers.serialize(this.sheet, context),
			fightStyle: this.fightStyle?.fightStyle.serialize(),
			maxWieldedItems: this.maxWieldedItems,
			attacks,
		};
	}

	private makeAttack(weapon: OffensiveWeapon, context: Context) {
		const attack = new CharacterAttack({
			weapon,
			skills: this.sheet.getSkills(),
			maxTotalCalculators: this.makeMaxTotalCalculators(),
			totalCalculators: this.makeTotalCalculators(context),
			attributes: this.getAttributes(),
			modifiers: {
				damage: this.modifiers.damage,
				test: this.modifiers.attack,
			},
		});
		return attack;
	}

	private makeSkillTotalCalculator(context: Context) {
		return SkillTotalCalculatorFactory.make(
			this.sheet.getSheetAttributes().getValues(),
			this.sheet.getLevel(),
			context,
		);
	}

	private selectDefaultFightStyle(powers: GeneralPowerMap) {
		for (const power of powers.values()) {
			if (power instanceof FightStyle) {
				this.selectFightStyle(power);
				break;
			}
		}
	}

	private makeMaxTotalCalculators(): ModifiersMaxTotalCalculators {
		return {
			fixedCalculator: this.makeFixedTotalCalculator(),
			perLevelCalculator: this.makePerLevelCalculator(),
		};
	}

	private makeTotalCalculators(context: Context): ModifiersTotalCalculators {
		return {
			contextCalculator: this.makeContextTotalCalculator(context),
			fixedCalculator: this.makeFixedTotalCalculator(),
			perLevelCalculator: this.makePerLevelCalculator(),
		};
	}

	private makeContextTotalCalculator(context: Context) {
		return new ContextualModifiersListTotalCalculator(context, this.getAttributes());
	}

	private makeFixedTotalCalculator() {
		return new FixedModifiersListTotalCalculator(this.getAttributes());
	}

	private makePerLevelCalculator() {
		return new PerLevelModifiersListTotalCalculator(this.getAttributes(), this.sheet.getLevel());
	}
}
