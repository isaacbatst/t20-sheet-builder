import type {BuildStep} from '../BuildStep';
import {Defense} from '../Defense/Defense';
import type {Equipment} from '../Inventory/Equipment/Equipment';
import {Inventory} from '../Inventory/Inventory';
import {LifePoints} from '../Points/LifePoints/LifePoints';
import {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import {InitialSkillsGenerator} from '../Skill/InitialSkillsGenerator';
import type {LearnableSpellType, Spell} from '../Spell/Spell';
import type {SpellCircle} from '../Spell/SpellCircle';
import type {SpellName} from '../Spell/SpellName';
import type {Attributes} from './Attributes';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {Level} from './Levels';
import {Proficiency} from './Proficiency';
import {Sheet} from './Sheet';
import {SheetBase} from './SheetBase';
import type {SheetAbilities, SheetPowers, SheetSkills, SheetTriggeredEffects} from './SheetBaseInterface';
import {Vision} from './Vision';

export class BuildingSheet extends SheetBase implements BuildingSheetInterface {
	level: Level = Level.one;
	readonly buildSteps: BuildStep[] = [];
	readonly lifePoints = new LifePoints();
	readonly manaPoints = new ManaPoints();
	readonly powers: SheetPowers = {general: new Map(), role: new Map(), origin: new Map()};
	readonly abilities: SheetAbilities = {race: new Map(), role: new Map()};
	readonly attributes: Attributes = Sheet.initialAttributes;
	readonly vision: Vision = Vision.default;
	readonly proficiencies: Proficiency[] = [Proficiency.simple, Proficiency.lightArmor];
	readonly skills: SheetSkills = InitialSkillsGenerator.generate();
	readonly defense = new Defense();
	readonly spells = new Map<SpellName, Spell>();
	readonly learnedCircles: Record<LearnableSpellType, Set<SpellCircle>> = {
		arcane: new Set(),
		divine: new Set(),
	};

	protected money = 0;
	protected inventory: Inventory = new Inventory();
	protected equipments: Equipment[] = [];
	protected displacement = 9;
	protected triggeredEffects: SheetTriggeredEffects = {attack: new Map(), defense: new Map()};
}
