import type {TriggeredEffectInterface, TriggerEvent} from '../Ability/TriggeredEffect';
import type {Attributes} from '../Attributes';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import type {ContextInterface} from '../Context';
import {Defense} from '../Defense';
import {Level} from '../Levels';
import type {LifePoints} from '../LifePoints';
import {LifePointsBuilder} from '../LifePointsBuilder';
import type {ManaPoints} from '../ManaPoints';
import {ManaPointsBuilder} from '../ManaPointsBuilder';
import {Proficiency} from '../Proficiency';
import type {BuildStep} from '../ProgressionStep';
import type {RaceInterface} from '../RaceInterface';
import type {RoleInterface} from '../Role/RoleInterface';
import type {SheetSkills} from './Sheet';
import {Sheet} from './Sheet';
import type {ActionPayload, ActionsHandler} from './SheetActions';
import type {SheetAbilities, SheetPowers} from './SheetInterface';
import {InitialSkillsGenerator} from '../Skill/InitialSkillsGenerator';
import type {LearnableSpellType, Spell} from '../Spell/Spell';
import type {SpellCircle} from '../Spell/SpellCircle';
import type {SpellName} from '../Spell/SpellName';
import {Vision} from '../Vision';

export class BuildingSheet implements BuildingSheetInterface {
	readonly buildSteps: BuildStep[] = [];
	readonly lifePoints = new LifePointsBuilder();
	readonly manaPoints = new ManaPointsBuilder();

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

	private race?: RaceInterface;
	private role?: RoleInterface;
	private readonly powers: SheetPowers = {general: new Map(), role: new Map()};
	private readonly abilities: SheetAbilities = {race: new Map(), role: new Map()};
	private attributes: Attributes = Sheet.initialAttributes;
	// eslint-disable-next-line @typescript-eslint/prefer-readonly
	private level: Level = Level.levelOne;
	private vision: Vision = Vision.default;
	private displacement = 9;
	private readonly proficiencies: Proficiency[] = [Proficiency.simple, Proficiency.lightArmor];
	private readonly skills: SheetSkills = InitialSkillsGenerator.generate();
	private readonly defense = new Defense();
	private readonly spells = new Map<SpellName, Spell>();
	private readonly learnedCircles: Record<LearnableSpellType, Set<SpellCircle>> = {
		arcane: new Set(),
		divine: new Set(),
	};

	private readonly triggeredEffects: Record<TriggerEvent, TriggeredEffectInterface[]> = {
		attack: [],
		defense: [],
	};

	getManaPoints() {
		return this.manaPoints;
	}

	getDefense(): Defense {
		return this.defense;
	}

	getDisplacement(): number {
		return this.displacement;
	}

	getLevel(): number {
		return this.level;
	}

	getSkills(): SheetSkills {
		return this.skills;
	}

	getVision(): Vision {
		return this.vision;
	}

	getLifePoints(): LifePointsBuilder {
		return this.lifePoints;
	}

	getRole() {
		return this.role;
	}

	getAttributes() {
		return this.attributes;
	}

	getProficiencies() {
		return this.proficiencies;
	}

	getAbilities(): SheetAbilities {
		return this.abilities;
	}

	getPowers(): SheetPowers {
		return this.powers;
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

	private chooseRole(payload: ActionPayload<'chooseRole'>) {
		this.role = payload.role;
	}

	private chooseRace(payload: ActionPayload<'chooseRace'>) {
		this.race = payload.race;
	}

	private pickGeneralPower(payload: ActionPayload<'pickGeneralPower'>) {
		return this.powers.general.set(payload.power.name, payload.power);
	}

	private pickRolePower(payload: ActionPayload<'pickRolePower'>) {
		return this.powers.role.set(payload.power.name, payload.power);
	}

	private setInitialAttributes(payload: ActionPayload<'setInitialAttributes'>) {
		this.attributes = payload.attributes;
	}

	private changeVision(payload: ActionPayload<'changeVision'>): void {
		this.vision = payload.vision;
	}

	private addModifierToLifePoints(payload: ActionPayload<'addModifierToLifePoints'>) {
		this.lifePoints.addModifier(payload.modifier);
	}

	private addOtherModifierToDefense(payload: ActionPayload<'addOtherModifierToDefense'>) {
		this.defense.others.add(payload.modifier);
	}

	private addOtherModifierToSkill(payload: ActionPayload<'addOtherModifierToSkill'>): void {
		this.skills[payload.skill].addOtherModifier(payload.modifier);
	}

	private trainSkill(payload: ActionPayload<'trainSkill'>): void {
		const skill = this.skills[payload.name];
		skill.train();
	}

	private addProficiency(payload: ActionPayload<'addProficiency'>) {
		if (this.proficiencies.includes(payload.proficiency)) {
			throw new Error('REPEATED_PROFICIENCY');
		}

		this.proficiencies.push(payload.proficiency);
	}

	private applyRaceModifiers(payload: ActionPayload<'applyRaceModifiers'>) {
		this.attributes = {
			...this.attributes,
			...payload.updatedAttributes,
		};
	}

	private applyRaceAbility(payload: ActionPayload<'applyRaceAbility'>) {
		this.abilities.race.set(payload.ability.name, payload.ability);
	}

	private changeDisplacement(payload: ActionPayload<'changeDisplacement'>) {
		if (payload.displacement < 0) {
			throw new Error('INVALID_NEGATIVE_DISPLACEMENT');
		}

		this.displacement = payload.displacement;
	}

	private applyRoleAbility(payload: ActionPayload<'applyRoleAbility'>) {
		this.abilities.role.set(payload.ability.name, payload.ability);
	}

	private learnSpell(payload: ActionPayload<'learnSpell'>) {
		if (!this.isSpellCircleLearned(payload.spell)) {
			throw new Error('CIRCLE_NOT_LEARNED');
		}

		this.spells.set(payload.spell.name, payload.spell);
	}

	private isSpellCircleLearned(spell: Spell) {
		if (spell.type !== 'universal') {
			return this.learnedCircles[spell.type].has(spell.circle);
		}

		return this.learnedCircles.arcane.has(spell.circle) || this.learnedCircles.divine.has(spell.circle);
	}

	private learnCircle(payload: ActionPayload<'learnCircle'>) {
		this.learnedCircles[payload.type].add(payload.circle);
	}

	private addTriggeredEffect(payload: ActionPayload<'addTriggeredEffect'>) {
		this.triggeredEffects[payload.effect.triggerEvent].push(payload.effect);
	}

	private addPerLevelModifierToLifePoints(payload: ActionPayload<'addPerLevelModifierToLifePoints'>) {
		this.lifePoints.addPerLevelModifier(payload.modifier);
	}
}
