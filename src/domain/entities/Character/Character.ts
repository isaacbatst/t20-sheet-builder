import {SheetBuilderError} from '../../errors';
import {OutOfGameContext, type ContextInterface} from '../Context';
import type {EquipmentName} from '../Inventory';
import {type GeneralPowerMap} from '../Map';
import {FixedModifier} from '../Modifier';
import {type ModifiersMaxTotalCalculators} from '../Modifier/Modifiers';
import {FightStyle} from '../Power/GeneralPower/CombatPower/FightStyle/FightStyle';
import {CharacterSheet, type Attribute, type Attributes, type CharacterSheetInterface, type SerializedSheetGeneralPower, type SerializedSheetInterface} from '../Sheet';
import { SheetBuilder } from '../Sheet/SheetBuilder';
import {type SkillTotalCalculator} from '../Skill/SkillTotalCalculator';
import {SkillTotalCalculatorFactory} from '../Skill/SkillTotalCalculatorFactory';
import type {CharacterAppliedFightStyle} from './CharacterAppliedFightStyle';
import {type CharacterAttack, type SerializedCharacterAttack} from './CharacterAttack';
import type {CharacterInterface} from './CharacterInterface';
import {CharacterModifiers, type SerializedCharacterModifiers} from './CharacterModifiers';

export type SerializedCharacter = {
	sheet: SerializedSheetInterface;
	attacks: SerializedCharacterAttack[];
	modifiers: SerializedCharacterModifiers;
	fightStyle?: SerializedSheetGeneralPower;
	maxWieldedItems: number;
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

	getAttributes(): Attributes {
		const attributes = this.sheet.getSheetAttributes();
		return attributes.getValues();
	}

	getAttacks(skillTotalCalculator: SkillTotalCalculator): Map<EquipmentName, CharacterAttack> {
		return this.sheet.getAttacks(skillTotalCalculator);
	}

	changeAttackTestAttribute(attack: CharacterAttack, attribute: Attribute, calculator: SkillTotalCalculator) {
		const skillName = attack.attack.getTestDefaultSkill();
		const skill = this.sheet.getSheetSkills().getSkill(skillName);
		const customTestAttributes = attack.attack.getCustomTestAttributes();
		const allowed = customTestAttributes.has(attribute) || attribute === skill.attribute;

		if (!allowed) {
			throw new SheetBuilderError('INVALID_ATTRIBUTE');
		}

		const skillWithAttribute = skill.makeWithOtherAttribute(attribute);
		const skillTotal = skillWithAttribute.getTotal(calculator);
		const skillModifier = new FixedModifier(skillName, skillTotal);
		attack.changeTestSkillModifier(skillModifier);
	}

	getAttackTestModifiersMaxTotal(attack: CharacterAttack, calculators: ModifiersMaxTotalCalculators): number {
		return attack.getTestModifiersMaxTotal(this.getAttributes(), calculators);
	}

	getWieldedItems(): EquipmentName[] {
		const inventory = this.sheet.getSheetInventory();
		return inventory.getWieldedItems();
	}

	getFightStyle(): CharacterAppliedFightStyle | undefined {
		return this.fightStyle;
	}

	serialize(context: ContextInterface, skillTotalCalculator = this.makeSkillTotalCalculator(context)): SerializedCharacter {
		const attacks: SerializedCharacterAttack[] = [];

		for (const attack of this.getAttacks(skillTotalCalculator).values()) {
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

	private makeSkillTotalCalculator(context: ContextInterface = new OutOfGameContext()) {
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
}
