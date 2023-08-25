import type {TriggerEvent} from '../Ability/TriggeredEffect';
import type {BuildStepInterface} from '../BuildStep';
import {type CharacterAttack} from '../Character/CharacterAttack';
import {type ContextInterface} from '../Context';
import {type EquipmentName} from '../Inventory/Equipment/EquipmentName';
import type {TriggeredEffectMap} from '../Map';
import {type SheetSkillsObject} from '../Skill/SheetSkill';
import {type SkillTotalCalculator} from '../Skill/SkillTotalCalculator';
import {type SerializedSheetInterface} from './SerializedSheet';
import {type SheetAbilitiesInterface} from './SheetAbilitiesInterface';
import {type SheetAttributesInterface} from './SheetAttributesInterface';
import {type SheetDefenseInterface} from './SheetDefenseInterface';
import {type SheetDevotion} from './SheetDevotion';
import {type SheetDisplacementInterface} from './SheetDisplacementInterface';
import {type SheetInventoryInterface} from './SheetInventoryInterface';
import {type SheetOriginInterface} from './SheetOriginInterface';
import {type SheetPointsInterface} from './SheetPointsInterface';
import {type SheetPowersInterface} from './SheetPowersInterface';
import {type SheetProficienciesInterface} from './SheetProficienciesInterface';
import {type SheetRaceInterface} from './SheetRaceInterface';
import {type SheetResistencesInterface} from './SheetResistencesInterface';
import {type SheetRoleInterface} from './SheetRoleInterface';
import {type SheetSizeInterface} from './SheetSizeInterface';
import {type SheetSkillsInterface} from './SheetSkillsInterface';
import {type SheetSpellsInterface} from './SheetSpellsInterface';
import {type SheetVisionInterface} from './SheetVisionInterface';

export type SheetTriggeredEffects = Record<TriggerEvent, TriggeredEffectMap>;

export type SheetInterface = {
	serialize(context?: ContextInterface): SerializedSheetInterface;
	pushBuildSteps(...buildSteps: BuildStepInterface[]): void;
	getBuildSteps(): BuildStepInterface[];
	getLevel(): number;
	getSheetAbilities(): SheetAbilitiesInterface;
	getSheetOrigin(): SheetOriginInterface;
	getSheetLifePoints(): SheetPointsInterface;
	getMaxLifePoints(): number;
	getSheetManaPoints(): SheetPointsInterface;
	getMaxManaPoints(): number;
	getSheetSkills(): SheetSkillsInterface;
	getSheetAttributes(): SheetAttributesInterface;
	getSheetSpells(): SheetSpellsInterface;
	getSheetInventory(): SheetInventoryInterface;
	getSkills(): SheetSkillsObject;
	getSheetPowers(): SheetPowersInterface;
	getSheetDefense(): SheetDefenseInterface;
	getSheetVision(): SheetVisionInterface;
	getSheetRace(): SheetRaceInterface;
	getSheetRole(): SheetRoleInterface;
	getSheetProficiencies(): SheetProficienciesInterface;
	getSheetDisplacement(): SheetDisplacementInterface;
	getSheetSize(): SheetSizeInterface;
	getSheetDevotion(): SheetDevotion;
	getSheetResistences(): SheetResistencesInterface;
};

