import type {EquipmentName} from '../Inventory';
import {type FightStyle} from '../Power/GeneralPower/CombatPower/FightStyle/FightStyle';
import {type Attributes, type Attribute} from '../Sheet/Attributes';
import {type CharacterSheet} from '../Sheet/CharacterSheet/CharacterSheet';
import {type SkillTotalCalculator} from '../Skill/SkillTotalCalculator';
import {type SkillTotalCalculatorFactory} from '../Skill/SkillTotalCalculatorFactory';
import type {CharacterAppliedFightStyle} from './CharacterAppliedFightStyle';
import type {CharacterAttack} from './CharacterAttack';
import {type CharacterModifiers} from './CharacterModifiers';

export type CharacterInterface = {
	modifiers: CharacterModifiers;
	sheet: CharacterSheet;
	selectFightStyle(fightStyle: FightStyle): void;
	unselectFightStyle(): void;

	getAttributes(): Attributes;
	getAttacks(skillTotalCalculator: SkillTotalCalculator): Map<EquipmentName, CharacterAttack>;
	changeAttackTestAttribute(attack: CharacterAttack, attribute: Attribute, calculator: SkillTotalCalculatorFactory): void;
	toggleEquipItem(name: EquipmentName): void;
	getWieldedItems(): EquipmentName[];

	getFightStyle(): CharacterAppliedFightStyle | undefined;
};
