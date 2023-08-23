import {SheetBuilderError} from '../../errors';
import {WeaponAttack} from '../Attack/WeaponAttack';
import {OutOfGameContext, type ContextInterface} from '../Context';
import type {EquipmentName} from '../Inventory';
import {OffensiveWeapon} from '../Inventory/Equipment/Weapon/OffensiveWeapon/OffensiveWeapon';
import {type GeneralPowerMap} from '../Map';
import {FixedModifier, FixedModifiersList} from '../Modifier';
import {Modifiers, type ModifiersMaxTotalCalculators} from '../Modifier/Modifiers';
import {FightStyle} from '../Power/GeneralPower/CombatPower/FightStyle/FightStyle';
import type {Attribute, Attributes, CharacterSheetInterface} from '../Sheet';
import {type SkillTotalCalculator} from '../Skill/SkillTotalCalculator';
import type {CharacterAppliedFightStyle} from './CharacterAppliedFightStyle';
import {CharacterAttack} from './CharacterAttack';
import type {CharacterInterface} from './CharacterInterface';
import {CharacterModifiers} from './CharacterModifiers';

export class Character implements CharacterInterface {
	private get maxWieldedItems() {
		return 2;
	}

	readonly modifiers = new CharacterModifiers();
	private fightStyle: CharacterAppliedFightStyle | undefined;

	constructor(
		readonly sheet: CharacterSheetInterface,
		readonly context: ContextInterface = new OutOfGameContext(),
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
		const attacks = new Map<EquipmentName, CharacterAttack>();
		const inventory = this.sheet.getSheetInventory();
		const equipments = inventory.getEquipments();
		equipments.forEach(({equipment}) => {
			if (equipment instanceof OffensiveWeapon) {
				const attack = this.makeCharacterAttack(equipment, skillTotalCalculator);
				attacks.set(equipment.name, attack);
			}
		});

		return attacks;
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

	makeCharacterAttack(equipment: OffensiveWeapon, skillTotalCalculator: SkillTotalCalculator) {
		const weaponAttack = new WeaponAttack(equipment);
		const testSkill = weaponAttack.getTestDefaultSkill();
		const skillValue = this.sheet.getSheetSkills().getSkill(testSkill).getTotal(skillTotalCalculator);
		const skillModifier = new FixedModifier(testSkill, skillValue);
		const fixedModifiers = new FixedModifiersList();
		const skillModifierIndex = fixedModifiers.add(skillModifier);
		fixedModifiers.add(...this.modifiers.attack.fixed.modifiers);
		const attack = new CharacterAttack(
			weaponAttack,
			skillModifierIndex,
			{
				test: new Modifiers({
					fixed: fixedModifiers,
					contextual: this.modifiers.attack.contextual,
					perLevel: this.modifiers.attack.perLevel,
				}),
				damage: this.modifiers.damage,
			});
		return attack;
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

	private selectDefaultFightStyle(powers: GeneralPowerMap) {
		for (const power of powers.values()) {
			if (power instanceof FightStyle) {
				this.selectFightStyle(power);
				break;
			}
		}
	}
}
