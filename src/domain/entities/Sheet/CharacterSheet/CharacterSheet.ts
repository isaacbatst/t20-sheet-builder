import type {BuildStep, BuildStepInterface} from '../../BuildStep';
import {type OriginInterface} from '../../Origin/Origin';
import {type RaceInterface} from '../../Race';
import {type RoleInterface} from '../../Role';
import {CharacterSheetOrigin} from './CharacterSheetOrigin';
import {CharacterSheetRace} from './CharacterSheetRace';
import {CharacterSheetRole} from './CharacterSheetRole';
import {Sheet} from '../Sheet';
import {type SheetAbilitiesInterface} from '../SheetAbilitiesInterface';
import {type SheetAttributesInterface} from '../SheetAttributesInterface';
import {type SheetDefenseInterface} from '../SheetDefenseInterface';
import {type SheetDisplacementInterface} from '../SheetDisplacementInterface';
import {type SheetInventoryInterface} from '../SheetInventoryInterface';
import {type SheetOriginInterface} from '../SheetOriginInterface';
import {type SheetPointsInterface} from '../SheetPointsInterface';
import {type SheetPowersInterface} from '../SheetPowersInterface';
import {type SheetProficienciesInterface} from '../SheetProficienciesInterface';
import {type SheetRoleInterface} from '../SheetRoleInterface';
import {type SheetSkillsInterface} from '../SheetSkillsInterface';
import {type SheetSpellsInterface} from '../SheetSpellsInterface';
import {type SheetVisionInterface} from '../SheetVisionInterface';
import {type SheetSizeInterface} from '../SheetSizeInterface';
import {type SheetDevotion} from '../SheetDevotion';
import {type SheetResistencies} from '../SheetResistencies';

type SheetParams = {
	race: RaceInterface;
	role: RoleInterface;
	origin: OriginInterface;
	level: number;
	buildSteps: BuildStep[];
	attributes: SheetAttributesInterface;
	lifePoints: SheetPointsInterface;
	manaPoints: SheetPointsInterface;
	vision: SheetVisionInterface;
	displacement: SheetDisplacementInterface;
	defense: SheetDefenseInterface;
	proficiencies: SheetProficienciesInterface;
	abilities: SheetAbilitiesInterface;
	powers: SheetPowersInterface;
	spells: SheetSpellsInterface;
	skills: SheetSkillsInterface;
	inventory: SheetInventoryInterface;
	size: SheetSizeInterface;
	devotion: SheetDevotion;
	sheetResistences: SheetResistencies;
};

export class CharacterSheet extends Sheet {
	protected sheetRace: CharacterSheetRace;
	protected sheetRole: SheetRoleInterface;
	protected sheetOrigin: SheetOriginInterface;
	protected buildSteps: BuildStepInterface[];
	protected level: number;
	protected sheetSize: SheetSizeInterface;
	protected sheetAbilities: SheetAbilitiesInterface;
	protected sheetLifePoints: SheetPointsInterface;
	protected sheetManaPoints: SheetPointsInterface;
	protected sheetSkills: SheetSkillsInterface;
	protected sheetAttributes: SheetAttributesInterface;
	protected sheetSpells: SheetSpellsInterface;
	protected sheetInventory: SheetInventoryInterface;
	protected sheetPowers: SheetPowersInterface;
	protected sheetDefense: SheetDefenseInterface;
	protected sheetVision: SheetVisionInterface;
	protected sheetProficiencies: SheetProficienciesInterface;
	protected sheetDisplacement: SheetDisplacementInterface;
	protected sheetDevotion: SheetDevotion;
	protected sheetResistences: SheetResistencies;

	constructor(
		params: SheetParams,
	) {
		super();
		this.sheetRace = new CharacterSheetRace(params.race);
		this.sheetRole = new CharacterSheetRole(params.role);
		this.sheetOrigin = new CharacterSheetOrigin(params.origin);
		this.sheetSkills = params.skills;
		this.sheetAttributes = params.attributes;
		this.sheetLifePoints = params.lifePoints;
		this.sheetManaPoints = params.manaPoints;
		this.level = params.level;
		this.sheetVision = params.vision;
		this.sheetDisplacement = params.displacement;
		this.sheetDefense = params.defense;
		this.buildSteps = params.buildSteps;
		this.sheetProficiencies = params.proficiencies;
		this.sheetAbilities = params.abilities;
		this.sheetPowers = params.powers;
		this.sheetSpells = params.spells;
		this.sheetInventory = params.inventory;
		this.sheetSize = params.size;
		this.sheetDevotion = params.devotion;
		this.sheetResistences = params.sheetResistences;
	}
}
