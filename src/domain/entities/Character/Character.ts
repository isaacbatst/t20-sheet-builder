import {TriggerEvent} from '../Ability';
import {PreviewContext, type Context} from '../Context';
import {OffensiveWeapon, type EquipmentName} from '../Inventory';
import {type GeneralPowerMap} from '../Map';
import {ContextualModifierAppliableValueCalculator, ContextualModifiersListTotalCalculator, FixedModifiersListTotalCalculator, PerLevelModifiersListTotalCalculator, type ContextualModifier, type ModifiersTotalCalculators} from '../Modifier';
import {type ModifiersMaxTotalCalculators} from '../Modifier/Modifiers';
import {FightStyle} from '../Power/GeneralPower/CombatPower/FightStyle/FightStyle';
import {Random, type RandomInterface} from '../Random';
import {type Attributes, type CharacterSheetInterface, type SerializedSheetGeneralPower, type SerializedSheetInterface} from '../Sheet';
import {SheetBuilder} from '../Sheet/SheetBuilder';
import {type SkillName} from '../Skill';
import {CharacterSkill} from '../Skill/CharacterSkill';
import {type SheetSkill} from '../Skill/SheetSkill';
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
		readonly context: Context = new PreviewContext(sheet),
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

	getContextualModifierAppliableValue(modifier: ContextualModifier) {
		const calculator = new ContextualModifierAppliableValueCalculator(
			this.getAttributes(),
			this.context,
			modifier,
		);
		return modifier.getAppliableValue(calculator);
	}

	getAttributes(): Attributes {
		const attributes = this.sheet.getSheetAttributes();
		return attributes.getValues();
	}

	getSkill(skillName: SkillName): CharacterSkill {
		const skill = this.makeCharacterSkill(
			this.sheet.getSkill(skillName),
			this.makeTotalCalculators(this.context),
		);

		return skill;
	}

	getSkills(): Record<SkillName, CharacterSkill> {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const skills = {} as Record<SkillName, CharacterSkill>;
		const totalCalculators = this.makeTotalCalculators(this.context);
		Object.entries(this.sheet.getSkills()).forEach(([skillName, skill]) => {
			skills[skillName as SkillName] = this.makeCharacterSkill(skill, totalCalculators);
		});

		return skills;
	}

	makeCharacterSkill(skill: SheetSkill, totalCalculators: ModifiersTotalCalculators) {
		return new CharacterSkill(
			skill,
			{
				skill: this.modifiers.skill.clone(),
				skillExceptAttack: this.modifiers.skillExceptAttack.clone(),
			},
			this.makeSkillTriggeredEffects(),
			totalCalculators,
		);
	}

	makeSkillTriggeredEffects() {
		return new Map([
			...this.sheet.getSheetTriggeredEffects().getByEvent(TriggerEvent.skillTest),
			...this.sheet.getSheetTriggeredEffects().getByEvent(TriggerEvent.skillTestExceptAttack),
		]);
	}

	getAttacks(): Map<EquipmentName, CharacterAttack> {
		const attacks = new Map<EquipmentName, CharacterAttack>();
		const inventory = this.sheet.getSheetInventory();
		const equipments = inventory.getEquipments();
		equipments.forEach(({equipment}) => {
			if (equipment instanceof OffensiveWeapon) {
				const typedEquipment = equipment as OffensiveWeapon;
				const attack = this.makeAttack(typedEquipment);
				attacks.set(typedEquipment.name, attack);
			}
		});

		return attacks;
	}

	getAttack(weaponName: EquipmentName) {
		const inventory = this.sheet.getSheetInventory();
		const weapon = inventory.getEquipment(weaponName);
		if (!weapon || !(weapon.equipment instanceof OffensiveWeapon)) {
			throw new Error('INVALID_EQUIPMENT');
		}

		const typedWeapon = weapon.equipment as OffensiveWeapon;

		return this.makeAttack(typedWeapon);
	}

	getWieldedItems(): EquipmentName[] {
		const inventory = this.sheet.getSheetInventory();
		return inventory.getWieldedItems();
	}

	getFightStyle(): CharacterAppliedFightStyle | undefined {
		return this.fightStyle;
	}

	serialize(): SerializedCharacter {
		const attacks: SerializedCharacterAttack[] = [];

		for (const attack of this.getAttacks().values()) {
			attacks.push(attack.serialize(this.sheet, this.context));
		}

		return {
			sheet: this.sheet.serialize(),
			modifiers: this.modifiers.serialize(this.sheet, this.context),
			fightStyle: this.fightStyle?.fightStyle.serialize(),
			maxWieldedItems: this.maxWieldedItems,
			attacks,
		};
	}

	private makeAttack(weapon: OffensiveWeapon) {
		const attackTriggeredEffects = this.sheet.getSheetTriggeredEffects().getByEvent(TriggerEvent.attack);
		const testTriggeredEffects = this.sheet.getSheetTriggeredEffects().getByEvent(TriggerEvent.skillTest);
		const effects = new Map([
			...attackTriggeredEffects,
			...testTriggeredEffects,
		]);
		const attack = new CharacterAttack({
			weapon,
			skills: this.sheet.getSkills(),
			maxTotalCalculators: this.makeMaxTotalCalculators(),
			totalCalculators: this.makeTotalCalculators(this.context),
			attributes: this.getAttributes(),
			modifiers: {
				damage: this.modifiers.damage,
				test: this.modifiers.attack,
			},
			triggeredEffects: effects,
		});
		return attack;
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
