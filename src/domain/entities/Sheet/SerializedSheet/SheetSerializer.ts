import {type AbilityEffectsInterface} from '../../Ability';
import {type ContextInterface} from '../../Context/ContextInterface';
import {DefenseTotalCalculatorFactory} from '../../Defense/DefenseTotalCalculatorFactory';
import {ContextualModifierAppliableValueCalculator, ContextualModifiersListTotalCalculator, FixedModifierAppliableValueCalculator, FixedModifiersListTotalCalculator, PerLevelModifierAppliableValueCalculator, PerLevelModifiersListTotalCalculator, type ContextualModifiersListInterface, type FixedModifiersListInterface, type ModifierAppliableValueCalculator, type ModifierInterface, type PerLevelModifiersListInterface} from '../../Modifier';
import {type OriginInterface} from '../../Origin';
import {type RaceInterface} from '../../Race';
import {type RaceAbility} from '../../Race/RaceAbility';
import {type RoleInterface} from '../../Role';
import {type RoleAbility} from '../../Role/RoleAbility';
import {type SkillName} from '../../Skill';
import {type Skill} from '../../Skill/Skill';
import {type SkillTotalCalculator} from '../../Skill/SkillTotalCalculator';
import {SkillTotalCalculatorFactory} from '../../Skill/SkillTotalCalculatorFactory';
import {type Spell} from '../../Spell';
import {type SheetDefenseInterface} from '../SheetDefenseInterface';
import {type SheetInterface} from '../SheetInterface';
import {type SheetInventoryInterface} from '../SheetInventoryInterface';
import {type SheetPointsInterface} from '../SheetPointsInterface';
import {type SheetPowersInterface} from '../SheetPowersInterface';
import {type SheetSkillsInterface} from '../SheetSkillsInterface';
import {type SheetSpellsInterface} from '../SheetSpellsInterface';
import {type SerializedSheetAbilityEffect, type SerializedSheetContextualModifiersList, type SerializedSheetDefense, type SerializedSheetGeneralPower, type SerializedSheetInterface, type SerializedSheetInventoryEquipment, type SerializedSheetModifier, type SerializedSheetModifiersList, type SerializedSheetOrigin, type SerializedSheetOriginPower, type SerializedSheetPerLevelModifiersList, type SerializedSheetPoints, type SerializedSheetRace, type SerializedSheetRaceAbility, type SerializedSheetRole, type SerializedSheetRoleAbility, type SerializedSheetRolePower, type SerializedSheetSkill, type SerializedSheetSkills, type SerializedSheetSpell} from './SerializedSheetInterface';

export class SheetSerializer {
	constructor(
		private readonly sheet: SheetInterface,
		private readonly context: ContextInterface,
	) {}

	serialize(): SerializedSheetInterface {
		const race = this.sheet.getSheetRace().getRace();
		const role = this.sheet.getSheetRole().getRole();
		const origin = this.sheet.getSheetOrigin().getOrigin();
		const powers = this.sheet.getSheetPowers();
		return {
			buildSteps: this.sheet.getBuildSteps(),
			level: this.sheet.getLevel(),
			displacement: this.sheet.getSheetDisplacement().getDisplacement(),
			attributes: this.sheet.getSheetAttributes().getValues(),
			defense: this.serializeDefense(this.sheet.getSheetDefense()),
			money: this.sheet.getSheetInventory().getMoney(),
			race: race ? this.serializeRace(race) : undefined,
			role: role ? this.serializeRole(role) : undefined,
			origin: origin ? this.serializeOrigin(origin) : undefined,
			lifePoints: this.serializePoints(this.sheet.getSheetLifePoints()),
			manaPoints: this.serializePoints(this.sheet.getSheetManaPoints()),
			equipments: this.serializeEquipments(this.sheet.getSheetInventory()),
			generalPowers: this.serializeGeneralPowers(powers),
			rolePowers: this.serializeRolePowers(powers),
			originPowers: this.serializeOriginPowers(powers),
			learnedCircles: this.sheet.getSheetSpells().getLearnedCircles(),
			proficiencies: this.sheet.getSheetProficiencies().getProficiencies(),
			skills: this.serializeSkills(this.sheet.getSheetSkills()),
			spells: this.serializeSpells(this.sheet.getSheetSpells()),
			tormentaPowersAttribute: this.sheet.getSheetAttributes().getTormentaPowersAttribute(),
			vision: this.sheet.getSheetVision().getVision(),
		};
	}

	private serializeSpells(spells: SheetSpellsInterface): SerializedSheetSpell[] {
		const serialized: SerializedSheetSpell[] = [];

		spells.getSpells().forEach(spell => {
			serialized.push(this.serializeSpell(spell));
		});

		return serialized;
	}

	private serializeSpell(spell: Spell): SerializedSheetSpell {
		return {
			name: spell.name,
			circle: spell.circle,
			school: spell.school,
			type: spell.type,
		};
	}

	private serializeSkills(sheetSkills: SheetSkillsInterface): SerializedSheetSkills {
		const attributes = this.sheet.getSheetAttributes().getValues();
		const level = this.sheet.getLevel();
		const calculator = SkillTotalCalculatorFactory.make(attributes, level, this.context);
		const skills = sheetSkills.getSkills();
		const entries = Object.entries(skills);
		const serialized = entries.reduce<SerializedSheetSkills>((acc, [skillName, skill]) => {
			acc[skillName as SkillName] = this.serializeSkill(skill, calculator);
			return acc;
		// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
		}, {} as SerializedSheetSkills);

		return serialized;
	}

	private serializeSkill(skill: Skill, totalCalculator: SkillTotalCalculator): SerializedSheetSkill {
		return {
			attribute: skill.attribute,
			contextualModifiers: this.serializeContextualModifiersList(skill.contextualModifiers),
			fixedModifiers: this.serializeFixedModifiersList(skill.fixedModifiers),
			isTrained: skill.getIsTrained(),
			total: skill.getTotal(totalCalculator),
			trainingPoints: skill.getTrainingPoints(),
		};
	}

	private serializeOriginPowers(powers: SheetPowersInterface): SerializedSheetOriginPower[] {
		const originPowers: SerializedSheetOriginPower[] = [];
		powers.getOriginPowers().forEach(originPower => {
			originPowers.push({
				name: originPower.name,
				effects: this.serializeAbilityEffects(originPower.effects),
				type: 'power',
			});
		});
		return originPowers;
	}

	private serializeRolePowers(powers: SheetPowersInterface): SerializedSheetRolePower[] {
		const rolePowers: SerializedSheetRolePower[] = [];
		powers.getRolePowers().forEach(rolePower => {
			rolePowers.push({
				name: rolePower.name,
				effects: this.serializeAbilityEffects(rolePower.effects),
				type: 'power',
			});
		});
		return rolePowers;
	}

	private serializeGeneralPowers(powers: SheetPowersInterface): SerializedSheetGeneralPower[] {
		const generalPowers: SerializedSheetGeneralPower[] = [];
		powers.getGeneralPowers().forEach(generalPower => {
			generalPowers.push({
				name: generalPower.name,
				effects: this.serializeAbilityEffects(generalPower.effects),
				group: generalPower.group,
				type: 'power',
			});
		});
		return generalPowers;
	}

	private serializeEquipments(sheetInventory: SheetInventoryInterface): SerializedSheetInventoryEquipment[] {
		const equipments: SerializedSheetInventoryEquipment[] = [];
		sheetInventory.getEquipments().forEach(inventoryEquipment => {
			equipments.push({
				name: inventoryEquipment.equipment.name,
				isEquipped: inventoryEquipment.getIsEquipped(),
			});
		});

		return equipments;
	}

	private serializePoints(points: SheetPointsInterface): SerializedSheetPoints {
		const attributes = this.sheet.getSheetAttributes().getValues();
		return {
			max: points.getMax(attributes, this.sheet.getLevel()),
			fixedModifiers: this.serializeFixedModifiersList(points.getFixedModifiers()),
			perLevelModifiers: this.serializePerLevelModifiersList(points.getPerLevelModifiers()),
		};
	}

	private serializeOrigin(origin: OriginInterface): SerializedSheetOrigin {
		return {
			name: origin.name,
			benefits: origin.benefits,
			chosenBenefits: origin.chosenBenefits,
			equipments: origin.equipments,
		};
	}

	private serializeRole(role: RoleInterface): SerializedSheetRole {
		return {
			abilities: Object.values(role.abilitiesPerLevel)
				.flatMap(levelAbilities => Object.values(levelAbilities)
					.map(roleAbility => this.serializeRoleAbility(roleAbility))),
			initialLifePoints: role.initialLifePoints,
			lifePointsPerLevel: role.lifePointsPerLevel,
			manaPerLevel: role.manaPerLevel,
			mandatorySkills: role.mandatorySkills,
			name: role.name,
			proficiencies: role.proficiencies,
			selectSkillGroups: role.selectSkillGroups,
			startsWithArmor: role.startsWithArmor,
			totalInitialSkills: role.getTotalInitialSkills(),
		};
	}

	private serializeRoleAbility(roleAbility: RoleAbility): SerializedSheetRoleAbility {
		return {
			effects: this.serializeAbilityEffects(roleAbility.effects),
			name: roleAbility.name,
			type: 'role',
		};
	}

	private serializeRace(race: RaceInterface): SerializedSheetRace {
		return {
			name: race.name,
			attributeModifiers: race.attributeModifiers,
			abilities: Object.values(race.abilities).map(ability => this.serializeRaceAbility(ability)),
		};
	}

	private serializeRaceAbility(raceAbility: RaceAbility): SerializedSheetRaceAbility {
		return {
			effects: this.serializeAbilityEffects(raceAbility.effects),
			name: raceAbility.name,
			type: 'race',
		};
	}

	private serializeAbilityEffects(effects: AbilityEffectsInterface): SerializedSheetAbilityEffect[] {
		return Object.values(effects)
			.flatMap(category => Object
				.values(category)
				.map(effect => ({
					description: effect.description,
				})));
	}

	private serializeDefense(sheetDefense: SheetDefenseInterface): SerializedSheetDefense {
		const defense = sheetDefense.getDefense();
		const attributes = this.sheet.getSheetAttributes().getValues();
		const inventory = this.sheet.getSheetInventory();
		const armorBonus = inventory.getArmorBonus();
		const shieldBonus = inventory.getShieldBonus();
		const totalCalculator = DefenseTotalCalculatorFactory.make(attributes, armorBonus, shieldBonus);

		return {
			attribute: defense.attribute,
			fixedModifiers: this.serializeFixedModifiersList(defense.fixedModifiers),
			total: defense.getTotal(totalCalculator),
		};
	}

	private serializeFixedModifiersList(list: FixedModifiersListInterface): SerializedSheetModifiersList {
		const attributes = this.sheet.getSheetAttributes().getValues();
		const appliableValueCalculator = new FixedModifierAppliableValueCalculator(attributes);
		const totalCalculator = new FixedModifiersListTotalCalculator(attributes);
		return {
			modifiers: list.modifiers.map(modifier => this.serializeModifier(modifier, appliableValueCalculator)),
			total: list.getTotal(totalCalculator),
		};
	}

	private serializePerLevelModifiersList(list: PerLevelModifiersListInterface): SerializedSheetPerLevelModifiersList {
		const attributes = this.sheet.getSheetAttributes().getValues();
		const level = this.sheet.getLevel();
		const totalCalculator = new PerLevelModifiersListTotalCalculator(attributes, level);
		return {
			modifiers: list.modifiers.map(modifier => {
				const calculator = new PerLevelModifierAppliableValueCalculator(attributes, level, modifier);
				return this.serializeModifier(modifier, calculator);
			}),
			total: list.getTotal(totalCalculator),
			totalPerLevel: list.getTotalPerLevel(level),
		};
	}

	private serializeContextualModifiersList(list: ContextualModifiersListInterface): SerializedSheetContextualModifiersList {
		const attributes = this.sheet.getSheetAttributes().getValues();
		const totalCalculator = new ContextualModifiersListTotalCalculator(this.context, attributes);
		return {
			modifiers: list.modifiers.map(modifier => {
				const calculator = new ContextualModifierAppliableValueCalculator(attributes, this.context, modifier);
				return this.serializeModifier(modifier, calculator);
			}),
			total: list.getTotal(totalCalculator),
			maxTotal: list.getMaxTotal(attributes),
		};
	}

	private serializeModifier(modifier: ModifierInterface, calculator: ModifierAppliableValueCalculator): SerializedSheetModifier {
		return {
			attributeBonuses: modifier.attributeBonuses,
			baseValue: modifier.baseValue,
			source: modifier.source,
			type: modifier.type,
			appliableValue: modifier.getAppliableValue(calculator),
		};
	}
}
