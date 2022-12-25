import type {TriggeredEffectInterface, TriggerEvent} from '../Ability/TriggeredEffect';
import type {Attributes} from '../Attributes';
import type {Defense} from '../Defense';
import type {Level} from '../Levels';
import type {LifePointsInterface} from '../LifePoints';
import type {ManaPointsInterface} from '../ManaPoints';
import type {Proficiency} from '../Proficiency';
import type {RaceInterface} from '../RaceInterface';
import type {RoleInterface} from '../Role/RoleInterface';
import type {LearnableSpellType, Spell} from '../Spell/Spell';
import type {SpellCircle} from '../Spell/SpellCircle';
import type {SpellName} from '../Spell/SpellName';
import type {Vision} from '../Vision';
import type {DefenseInterface} from './BuildingSheetInterface';
import type {SheetSkills} from './Sheet';
import type {ActionPayload} from './SheetActions';
import type {SheetAbilities, SheetPowers} from './SheetInterface';

export type SheetLearnedCircles = Record<LearnableSpellType, Set<SpellCircle>>;
export type SheetSpells = Map<SpellName, Spell>;
export type SheetTriggeredEffects = Record<TriggerEvent, TriggeredEffectInterface[]>;

export type SheetBaseInterface = {
	getAttributes(): Attributes;
	getDefense(): DefenseInterface;
	getDisplacement(): number;
	getLevel(): number;
	getSkills(): SheetSkills;
	getVision(): Vision;
	getProficiencies(): Proficiency[];
	getAbilities(): SheetAbilities;
	getPowers(): SheetPowers;
	getSpells(): SheetSpells;
	getLearnedCircles(): SheetLearnedCircles;
	getTriggeredEffects(): SheetTriggeredEffects;
};

export abstract class SheetBase implements SheetBaseInterface {
	protected race?: RaceInterface;
	protected role?: RoleInterface;
	protected abstract readonly powers: SheetPowers;
	protected abstract readonly abilities: SheetAbilities;
	protected abstract attributes: Attributes;
	protected abstract level: Level;
	protected abstract vision: Vision;
	protected abstract readonly proficiencies: Proficiency[];
	protected abstract readonly skills: SheetSkills;
	protected abstract readonly defense: Defense;
	protected abstract readonly spells: SheetSpells;
	protected abstract readonly learnedCircles: SheetLearnedCircles;
	protected abstract readonly triggeredEffects: SheetTriggeredEffects;
	protected abstract displacement: number;
	protected abstract lifePoints: LifePointsInterface;
	protected abstract manaPoints: ManaPointsInterface;

	getAttributes(): Attributes {
		return this.attributes;
	}

	getDefense(): DefenseInterface {
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

	getProficiencies(): Proficiency[] {
		return this.proficiencies;
	}

	getAbilities(): SheetAbilities {
		return this.abilities;
	}

	getPowers(): SheetPowers {
		return this.powers;
	}

	getSpells(): SheetSpells {
		return this.spells;
	}

	getLearnedCircles(): SheetLearnedCircles {
		return this.learnedCircles;
	}

	getTriggeredEffects(): SheetTriggeredEffects {
		return this.triggeredEffects;
	}

	protected changeDisplacement(payload: ActionPayload<'changeDisplacement'>) {
		if (payload.displacement < 0) {
			throw new Error('INVALID_NEGATIVE_DISPLACEMENT');
		}

		this.displacement = payload.displacement;
	}

	protected chooseRole(payload: ActionPayload<'chooseRole'>) {
		this.role = payload.role;
	}

	protected chooseRace(payload: ActionPayload<'chooseRace'>) {
		this.race = payload.race;
	}

	protected pickGeneralPower(payload: ActionPayload<'pickGeneralPower'>) {
		return this.powers.general.set(payload.power.name, payload.power);
	}

	protected pickRolePower(payload: ActionPayload<'pickRolePower'>) {
		return this.powers.role.set(payload.power.name, payload.power);
	}

	protected setInitialAttributes(payload: ActionPayload<'setInitialAttributes'>) {
		this.attributes = payload.attributes;
	}

	protected changeVision(payload: ActionPayload<'changeVision'>): void {
		this.vision = payload.vision;
	}

	protected addModifierToLifePoints(payload: ActionPayload<'addModifierToLifePoints'>) {
		this.lifePoints.addModifier(payload.modifier);
	}

	protected addOtherModifierToDefense(payload: ActionPayload<'addOtherModifierToDefense'>) {
		this.defense.others.add(payload.modifier);
	}

	protected addOtherModifierToSkill(payload: ActionPayload<'addOtherModifierToSkill'>): void {
		this.skills[payload.skill].addOtherModifier(payload.modifier);
	}

	protected trainSkill(payload: ActionPayload<'trainSkill'>): void {
		const skill = this.skills[payload.name];
		skill.train();
	}

	protected addProficiency(payload: ActionPayload<'addProficiency'>) {
		if (this.proficiencies.includes(payload.proficiency)) {
			throw new Error('REPEATED_PROFICIENCY');
		}

		this.proficiencies.push(payload.proficiency);
	}

	protected applyRaceModifiers(payload: ActionPayload<'applyRaceModifiers'>) {
		this.attributes = {
			...this.attributes,
			...payload.updatedAttributes,
		};
	}

	protected applyRaceAbility(payload: ActionPayload<'applyRaceAbility'>) {
		this.abilities.race.set(payload.ability.name, payload.ability);
	}

	protected applyRoleAbility(payload: ActionPayload<'applyRoleAbility'>) {
		this.abilities.role.set(payload.ability.name, payload.ability);
	}

	protected learnSpell(payload: ActionPayload<'learnSpell'>) {
		if (!this.isSpellCircleLearned(payload.spell)) {
			throw new Error('CIRCLE_NOT_LEARNED');
		}

		this.spells.set(payload.spell.name, payload.spell);
	}

	protected isSpellCircleLearned(spell: Spell) {
		if (spell.type !== 'universal') {
			return this.learnedCircles[spell.type].has(spell.circle);
		}

		return this.learnedCircles.arcane.has(spell.circle) || this.learnedCircles.divine.has(spell.circle);
	}

	protected learnCircle(payload: ActionPayload<'learnCircle'>) {
		this.learnedCircles[payload.type].add(payload.circle);
	}

	protected addTriggeredEffect(payload: ActionPayload<'addTriggeredEffect'>) {
		this.triggeredEffects[payload.effect.triggerEvent].push(payload.effect);
	}

	protected addPerLevelModifierToLifePoints(payload: ActionPayload<'addPerLevelModifierToLifePoints'>) {
		this.lifePoints.addPerLevelModifier(payload.modifier);
	}
}
