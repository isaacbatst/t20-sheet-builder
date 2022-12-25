import type {TriggeredEffectInterface, TriggerEvent} from '../Ability/TriggeredEffect';
import type {Attributes} from '../Attributes';
import type {ContextInterface} from '../Context';
import {Defense} from '../Defense';
import {Level} from '../Levels';
import type {LifePoints} from '../LifePoints';
import {BuildingLifePoints} from '../LifePointsBuilder';
import type {ManaPoints} from '../ManaPoints';
import {BuildingManaPoints} from '../ManaPointsBuilder';
import {Proficiency} from '../Proficiency';
import type {BuildStep} from '../ProgressionStep';
import type {RoleInterface} from '../Role/RoleInterface';
import {InitialSkillsGenerator} from '../Skill/InitialSkillsGenerator';
import type {LearnableSpellType, Spell} from '../Spell/Spell';
import type {SpellCircle} from '../Spell/SpellCircle';
import type {SpellName} from '../Spell/SpellName';
import {Vision} from '../Vision';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import type {SheetSkills} from './Sheet';
import {Sheet} from './Sheet';
import type {ActionsHandler} from './SheetActions';
import type {SheetLearnedCircles, SheetSpells, SheetTriggeredEffects} from './SheetBase';
import {SheetBase} from './SheetBase';
import type {SheetAbilities, SheetPowers} from './SheetInterface';

export class BuildingSheet extends SheetBase implements BuildingSheetInterface {
	level: Level = Level.levelOne;
	readonly buildSteps: BuildStep[] = [];
	readonly lifePoints = new BuildingLifePoints();
	readonly manaPoints = new BuildingManaPoints();
	readonly powers: SheetPowers = {general: new Map(), role: new Map()};
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

	readonly triggeredEffects: Record<TriggerEvent, TriggeredEffectInterface[]> = {
		attack: [],
		defense: [],
	};

	readonly actionHandlers: ActionsHandler = {
		addOtherModifierToDefense: this.addOtherModifierToDefense.bind(this),
		addOtherModifierToSkill: this.addOtherModifierToSkill.bind(this),
		chooseRace: this.chooseRace.bind(this),
		trainSkill: this.trainSkill.bind(this),
		changeVision: this.changeVision.bind(this),
		setInitialAttributes: this.setInitialAttributes.bind(this),
		applyRaceModifiers: this.applyRaceModifiers.bind(this),
		applyRaceAbility: this.applyRaceAbility.bind(this),
		pickGeneralPower: this.pickGeneralPower.bind(this),
		pickRolePower: this.pickRolePower.bind(this),
		changeDisplacement: this.changeDisplacement.bind(this),
		addModifierToLifePoints: this.addModifierToLifePoints.bind(this),
		chooseRole: this.chooseRole.bind(this),
		addProficiency: this.addProficiency.bind(this),
		applyRoleAbility: this.applyRoleAbility.bind(this),
		learnCircle: this.learnCircle.bind(this),
		learnSpell: this.learnSpell.bind(this),
		addTriggeredEffect: this.addTriggeredEffect.bind(this),
		addPerLevelModifierToLifePoints: this.addPerLevelModifierToLifePoints.bind(this),
	};

	protected displacement = 9;

	getManaPoints() {
		return this.manaPoints;
	}

	getLifePoints(): BuildingLifePoints {
		return this.lifePoints;
	}

	getRole() {
		return this.role;
	}

	buildLifePoints(context: ContextInterface, role: RoleInterface): LifePoints {
		return this.lifePoints.build({
			context,
			role,
			constitution: this.attributes.constitution,
			level: this.level,
		});
	}

	buildManaPoints(context: ContextInterface, role: RoleInterface): ManaPoints {
		return this.manaPoints.build({
			context,
			role,
			level: this.level,
		});
	}
}
