import {SheetBuilderError} from '../../errors';
import {WeaponAttack} from '../Attack';
import {type Context} from '../Context';
import {OffensiveWeapon, type EquipmentName} from '../Inventory';
import {type GeneralPowerMap} from '../Map';
import {ContextualModifierAppliableValueCalculator, ContextualModifiersListTotalCalculator, FixedModifier, FixedModifiersList, FixedModifiersListTotalCalculator, PerLevelModifiersListTotalCalculator, type ContextualModifier, type ModifiersTotalCalculators} from '../Modifier';
import {Modifiers, type ModifiersMaxTotalCalculators} from '../Modifier/Modifiers';
import {FightStyle} from '../Power/GeneralPower/CombatPower/FightStyle/FightStyle';
import {Random, type RandomInterface} from '../Random';
import {type Attribute, type Attributes, type CharacterSheetInterface, type SerializedSheetGeneralPower, type SerializedSheetInterface} from '../Sheet';
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
				const attack = this.makeCharacterAttack(typedEquipment, context);
				attacks.set(typedEquipment.name, attack);
			}
		});

		return attacks;
	}

	makeCharacterAttack(equipment: OffensiveWeapon, context: Context) {
		const weaponAttack = new WeaponAttack(equipment);
		const skillTotalCalculator = this.makeSkillTotalCalculator(context);
		const testSkill = weaponAttack.getTestDefaultSkill();
		const skillValue = this.sheet.getSheetSkills().getSkill(testSkill).getTotal(skillTotalCalculator);
		const skillModifier = new FixedModifier(testSkill, skillValue);
		const testFixedModifiers = new FixedModifiersList();
		testFixedModifiers.add(...this.modifiers.attack.fixed.modifiers);
		const testSkillModifierIndex = testFixedModifiers.add(skillModifier);
		const damageAttribute = weaponAttack.getDamageAttribute();
		const damageFixedModifiers = new FixedModifiersList();
		damageFixedModifiers.add(...this.modifiers.damage.fixed.modifiers);
		let damageAttributeModifierIndex: number | undefined;
		if (damageAttribute) {
			const attribute = this.sheet.getSheetAttributes().getValues()[damageAttribute];
			const modifier = new FixedModifier(damageAttribute, attribute);
			damageAttributeModifierIndex = damageFixedModifiers.add(modifier);
		}

		const attack = new CharacterAttack({
			attack: weaponAttack,
			testSkillModifierIndex,
			damageAttributeModifierIndex,
			maxTotalCalculators: this.makeMaxTotalCalculators(),
			totalCalculators: this.makeTotalCalculators(context),
			attributes: this.getAttributes(),
			modifiers: {
				test: new Modifiers({
					fixed: testFixedModifiers,
					contextual: this.modifiers.attack.contextual,
					perLevel: this.modifiers.attack.perLevel,
				}),
				damage: new Modifiers({
					fixed: damageFixedModifiers,
					contextual: this.modifiers.damage.contextual,
					perLevel: this.modifiers.damage.perLevel,
				}),
			},
		});
		return attack;
	}

	changeAttackTestAttribute(attack: CharacterAttack, attribute: Attribute, context: Context) {
		const skillName = attack.attack.getTestDefaultSkill();
		const skill = this.sheet.getSheetSkills().getSkill(skillName);
		const customTestAttributes = attack.attack.getCustomTestAttributes();
		const allowed = customTestAttributes.has(attribute) || attribute === skill.attribute;

		if (!allowed) {
			throw new SheetBuilderError('INVALID_ATTRIBUTE');
		}

		const skillWithAttribute = skill.makeWithOtherAttribute(attribute);
		const calculator = this.makeSkillTotalCalculator(context);
		const skillTotal = skillWithAttribute.getTotal(calculator);
		const skillModifier = new FixedModifier(skillName, skillTotal);
		attack.changeTestSkillModifier(skillModifier);
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
