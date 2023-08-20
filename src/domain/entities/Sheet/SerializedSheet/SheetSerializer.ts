import {type AbilityEffectsInterface} from '../../Ability';
import {type BuildStepInterface} from '../../BuildStep';
import {type ContextInterface} from '../../Context/ContextInterface';
import {DefenseTotalCalculatorFactory} from '../../Defense/DefenseTotalCalculatorFactory';
import {type PerLevelModifiersListInterface, type ContextualModifiersList, type FixedModifiersListInterface} from '../../Modifier';
import {type RaceInterface, type SerializedRace} from '../../Race';
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
import {type SerializedSheetAbilityEffect, type SerializedSheetBuildStep, type SerializedSheetContextualModifiersList, type SerializedSheetDefense, type SerializedSheetGeneralPower, type SerializedSheetGrantedPower, type SerializedSheetInterface, type SerializedSheetInventoryEquipment, type SerializedSheetLearnedCircles, type SerializedSheetModifiersList, type SerializedSheetOriginPower, type SerializedSheetPerLevelModifiersList, type SerializedSheetPoints, type SerializedSheetRole, type SerializedSheetRoleAbility, type SerializedSheetRolePower, type SerializedSheetSkill, type SerializedSheetSkills, type SerializedSheetSpell} from './SerializedSheetInterface';

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
			role: role ? role.serialize() : undefined,
			origin: origin ? origin.serialize() : undefined,
			lifePoints: this.serializePoints(sheet.getSheetLifePoints(), sheet),
			manaPoints: this.serializePoints(sheet.getSheetManaPoints(), sheet),
			equipments: this.serializeEquipments(sheet.getSheetInventory()),
			generalPowers: this.serializeGeneralPowers(powers),
			rolePowers: this.serializeRolePowers(powers),
			originPowers: this.serializeOriginPowers(powers),
			grantedPowers: this.serializeGrantedPowers(powers),
			grantedPowersCount: sheet.getSheetDevotion().getGrantedPowerCount(),
			learnedCircles: this.serializeLearnedCircles(sheet.getSheetSpells()),
			proficiencies: sheet.getSheetProficiencies().getProficiencies(),
			skills: this.serializeSkills(sheet.getSheetSkills(), sheet),
			spells: this.serializeSpells(sheet.getSheetSpells()),
			tormentaPowersAttribute: sheet.getSheetAttributes().getTormentaPowersAttribute(),
			vision: sheet.getSheetVision().getVision(),
			devotion: sheet.getSheetDevotion().serialize(),
			resistencies: sheet.getSheetResistences().serialize(sheet, this.context),
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
			abilityType: spell.abilityType,
			type: spell.type,
			effects: this.serializeAbilityEffects(spell.effects),
			school: spell.school,
			shortDescription: spell.shortDescription,
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
				abilityType: 'power',
			});
		});
		return originPowers;
	}

	private serializeGrantedPowers(powers: SheetPowersInterface): SerializedSheetGrantedPower[] {
		const grantedPowers: SerializedSheetGrantedPower[] = [];
		powers.getGrantedPowers().forEach(grantedPower => {
			grantedPowers.push({
				name: grantedPower.name,
				effects: this.serializeAbilityEffects(grantedPower.effects),
				abilityType: 'power',
			});
		});
		return grantedPowers;
	}

	private serializeRolePowers(powers: SheetPowersInterface): SerializedSheetRolePower[] {
		const rolePowers: SerializedSheetRolePower[] = [];
		powers.getRolePowers().forEach(rolePower => {
			rolePowers.push({
				name: rolePower.name,
				effects: this.serializeAbilityEffects(rolePower.effects),
				abilityType: 'power',
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
				abilityType: 'power',
			});
		});
		return generalPowers;
	}

	private serializeEquipments(sheetInventory: SheetInventoryInterface): SerializedSheetInventoryEquipment[] {
		const equipments: SerializedSheetInventoryEquipment[] = [];
		sheetInventory.getEquipments().forEach(inventoryEquipment => {
			equipments.push(inventoryEquipment.serialize());
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
			abilityType: 'role',
		};
	}

	private serializeRace(race: RaceInterface): SerializedRace {
		return race.serialize() as SerializedRace;
	}

	private serializeAbilityEffects(effects: AbilityEffectsInterface): SerializedSheetAbilityEffect[] {
		return effects.serialize();
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
			fixedModifiers: defense.fixedModifiers.serialize(sheet, this.context),
			total: defense.getTotal(totalCalculator),
		};
	}

	private serializeFixedModifiersList(list: FixedModifiersListInterface, sheet: SheetInterface): SerializedSheetModifiersList {
		return list.serialize(sheet, this.context);
	}

	private serializePerLevelModifiersList(list: PerLevelModifiersListInterface, sheet: SheetInterface): SerializedSheetPerLevelModifiersList {
		return list.serialize(sheet, this.context);
	}

	private serializeContextualModifiersList(list: ContextualModifiersList, sheet: SheetInterface): SerializedSheetContextualModifiersList {
		return list.serialize(sheet, this.context);
	}
}
