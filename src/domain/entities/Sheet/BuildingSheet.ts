import type {Attributes} from './Attributes';
import type {BuildStep} from '../BuildStep';
import {Defense} from '../Defense/Defense';
import type {Equipment} from '../Equipment/Equipment';
import {Level} from './Levels';
import {LifePoints} from '../Points/LifePoints/LifePoints';
import {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import {PointsMaxCalculatorFactory} from '../Points/PointsMaxCalculatorFactory';
import {Proficiency} from './Proficiency';
import {InitialSkillsGenerator} from '../Skill/InitialSkillsGenerator';
import type {LearnableSpellType, Spell} from '../Spell/Spell';
import type {SpellCircle} from '../Spell/SpellCircle';
import type {SpellName} from '../Spell/SpellName';
import {Vision} from './Vision';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {Sheet} from './Sheet';
import {SheetBase} from './SheetBase';
import type {SheetAbilities, SheetPowers, SheetSkills, SheetTriggeredEffects} from './SheetBaseInterface';

export class BuildingSheet extends SheetBase implements BuildingSheetInterface {
	level: Level = Level.levelOne;
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

	protected equipments: Equipment[] = [];
	protected displacement = 9;
	protected triggeredEffects: SheetTriggeredEffects = {attack: new Map(), defense: new Map()};

	getRole() {
		return this.role;
	}
}
