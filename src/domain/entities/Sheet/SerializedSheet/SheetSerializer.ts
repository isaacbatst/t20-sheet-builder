import {type AbilityEffectsInterface} from '../../Ability';
import {type BuildStepInterface} from '../../BuildStep';
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
import {type LearnableSpellType, type Spell} from '../../Spell';
import {type SheetDefenseInterface} from '../SheetDefenseInterface';
import {type SheetInterface} from '../SheetInterface';
import {type SheetInventoryInterface} from '../SheetInventoryInterface';
import {type SheetPointsInterface} from '../SheetPointsInterface';
import {type SheetPowersInterface} from '../SheetPowersInterface';
import {type SheetSkillsInterface} from '../SheetSkillsInterface';
import {type SheetSpellsInterface} from '../SheetSpellsInterface';
import {type SerializedSheetBuildStep, type SerializedSheetAbilityEffect, type SerializedSheetContextualModifiersList, type SerializedSheetDefense, type SerializedSheetGeneralPower, type SerializedSheetInterface, type SerializedSheetInventoryEquipment, type SerializedSheetLearnedCircles, type SerializedSheetModifier, type SerializedSheetModifiersList, type SerializedSheetOrigin, type SerializedSheetOriginPower, type SerializedSheetPerLevelModifiersList, type SerializedSheetPoints, type SerializedSheetRace, type SerializedSheetRaceAbility, type SerializedSheetRole, type SerializedSheetRoleAbility, type SerializedSheetRolePower, type SerializedSheetSkill, type SerializedSheetSkills, type SerializedSheetSpell} from './SerializedSheetInterface';

export class SheetSerializer {
	constructor(
		private readonly context: ContextInterface,
	) {}

	serialize(sheet: SheetInterface): SerializedSheetInterface {
		const race = sheet.getSheetRace().getRace();
		const role = sheet.getSheetRole().getRole();
		const origin = sheet.getSheetOrigin().getOrigin();
		const powers = sheet.getSheetPowers();
		return {
			buildSteps: this.serializeBuildSteps(sheet.getBuildSteps()),
			level: sheet.getLevel(),
			displacement: sheet.getSheetDisplacement().getDisplacement(),
			attributes: sheet.getSheetAttributes().getValues(),
			defense: this.serializeDefense(sheet.getSheetDefense(), sheet),
			money: sheet.getSheetInventory().getMoney(),
			race: race ? this.serializeRace(race) : undefined,
			role: role ? this.serializeRole(role) : undefined,
			origin: origin ? this.serializeOrigin(origin) : undefined,
			lifePoints: this.serializePoints(sheet.getSheetLifePoints(), sheet),
			manaPoints: this.serializePoints(sheet.getSheetManaPoints(), sheet),
			equipments: this.serializeEquipments(sheet.getSheetInventory()),
			generalPowers: this.serializeGeneralPowers(powers),
			rolePowers: this.serializeRolePowers(powers),
			originPowers: this.serializeOriginPowers(powers),
			learnedCircles: this.serializeLearnedCircles(sheet.getSheetSpells()),
			proficiencies: sheet.getSheetProficiencies().getProficiencies(),
			skills: this.serializeSkills(sheet.getSheetSkills(), sheet),
			spells: this.serializeSpells(sheet.getSheetSpells()),
			tormentaPowersAttribute: sheet.getSheetAttributes().getTormentaPowersAttribute(),
			vision: sheet.getSheetVision().getVision(),
		};
	}

	private serializeBuildSteps(buildSteps: BuildStepInterface[]): SerializedSheetBuildStep[] {
		return buildSteps.map(buildStep => ({
			action: {
				type: buildStep.action.type,
				description: buildStep.action.description,
			},
		}));
	}

	private serializeLearnedCircles(spells: SheetSpellsInterface): SerializedSheetLearnedCircles {
		const circlesPerType = spells.getLearnedCircles();
		const serialized: SerializedSheetLearnedCircles = {
			arcane: [],
			divine: [],
		};

		Object.entries(circlesPerType).forEach(([type, circles]) => {
			serialized[type as LearnableSpellType] = [...circles];
		});

		return serialized;
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

	private serializeSkills(sheetSkills: SheetSkillsInterface, sheet: SheetInterface): SerializedSheetSkills {
		const attributes = sheet.getSheetAttributes().getValues();
		const level = sheet.getLevel();
		const calculator = SkillTotalCalculatorFactory.make(attributes, level, this.context);
		const skills = sheetSkills.getSkills();
		const entries = Object.entries(skills);
		const serialized = entries.reduce<SerializedSheetSkills>((acc, [skillName, skill]) => {
			acc[skillName as SkillName] = this.serializeSkill(skill, calculator, sheet);
			return acc;
		// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
		}, {} as SerializedSheetSkills);

		return serialized;
	}

	private serializeSkill(skill: Skill, totalCalculator: SkillTotalCalculator, sheet: SheetInterface): SerializedSheetSkill {
		return {
			attribute: skill.attribute,
			contextualModifiers: this.serializeContextualModifiersList(skill.contextualModifiers, sheet),
			fixedModifiers: this.serializeFixedModifiersList(skill.fixedModifiers, sheet),
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

	private serializePoints(points: SheetPointsInterface, sheet: SheetInterface): SerializedSheetPoints {
		const attributes = sheet.getSheetAttributes().getValues();
		return {
			max: points.getMax(attributes, sheet.getLevel()),
			fixedModifiers: this.serializeFixedModifiersList(points.getFixedModifiers(), sheet),
			perLevelModifiers: this.serializePerLevelModifiersList(points.getPerLevelModifiers(), sheet),
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

	private serializeDefense(sheetDefense: SheetDefenseInterface, sheet: SheetInterface): SerializedSheetDefense {
		const defense = sheetDefense.getDefense();
		const attributes = sheet.getSheetAttributes().getValues();
		const inventory = sheet.getSheetInventory();
		const armorBonus = inventory.getArmorBonus();
		const shieldBonus = inventory.getShieldBonus();
		const totalCalculator = DefenseTotalCalculatorFactory.make(attributes, armorBonus, shieldBonus);

		return {
			attribute: defense.attribute,
			fixedModifiers: this.serializeFixedModifiersList(defense.fixedModifiers, sheet),
			total: defense.getTotal(totalCalculator),
		};
	}

	private serializeFixedModifiersList(list: FixedModifiersListInterface, sheet: SheetInterface): SerializedSheetModifiersList {
		const attributes = sheet.getSheetAttributes().getValues();
		const appliableValueCalculator = new FixedModifierAppliableValueCalculator(attributes);
		const totalCalculator = new FixedModifiersListTotalCalculator(attributes);
		return {
			modifiers: list.modifiers.map(modifier => this.serializeModifier(modifier, appliableValueCalculator)),
			total: list.getTotal(totalCalculator),
		};
	}

	private serializePerLevelModifiersList(list: PerLevelModifiersListInterface, sheet: SheetInterface): SerializedSheetPerLevelModifiersList {
		const attributes = sheet.getSheetAttributes().getValues();
		const level = sheet.getLevel();
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

	private serializeContextualModifiersList(list: ContextualModifiersListInterface, sheet: SheetInterface): SerializedSheetContextualModifiersList {
		const attributes = sheet.getSheetAttributes().getValues();
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
