import type {Attributes} from '../Attributes';
import type {Defense} from '../Defense/Defense';
import type {DefenseInterface} from '../Defense/DefenseInterface';
import type {Level} from '../Levels';
import type {PointsBase} from '../Points/PointsBase';
import type {Proficiency} from '../Proficiency';
import type {BuildStepInterface} from '../ProgressionStep';
import type {RaceInterface} from '../RaceInterface';
import type {RoleInterface} from '../Role/RoleInterface';
import type {Spell} from '../Spell/Spell';
import type {Vision} from '../Vision';
import type {ActionPayload} from './SheetActions';
import type {SheetAbilities, SheetBaseInterface, SheetLearnedCircles, SheetPowers, SheetSkills, SheetSpells, SheetTriggeredEffects} from './SheetBaseInterface';
export abstract class SheetBase implements SheetBaseInterface {
	abstract readonly buildSteps: BuildStepInterface[];
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
	protected abstract lifePoints: PointsBase;
	protected abstract manaPoints: PointsBase;

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

	protected addFixedModifierToLifePoints(payload: ActionPayload<'addFixedModifierToLifePoints'>) {
		this.lifePoints.addModifier(payload.modifier);
	}

	protected addFixedModifierToDefense(payload: ActionPayload<'addFixedModifierToDefense'>) {
		this.defense.fixedModifiers.add(payload.modifier);
	}

	protected addFixedModifierToSkill(payload: ActionPayload<'addFixedModifierToSkill'>): void {
		this.skills[payload.skill].fixedModifiers.add(payload.modifier);
	}

	protected addContextualModifierToSkill(payload: ActionPayload<'addContextualModifierToSkill'>): void {
		this.skills[payload.skill].contextualModifiers.add(payload.modifier);
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
		this.triggeredEffects[payload.effect.triggerEvent].set(payload.effect.name, payload.effect);
	}

	protected addPerLevelModifierToLifePoints(payload: ActionPayload<'addPerLevelModifierToLifePoints'>) {
		this.lifePoints.addPerLevelModifier(payload.modifier);
	}

	protected addPerLevelModifierToManaPoints(payload: ActionPayload<'addPerLevelModifierToManaPoints'>) {
		this.manaPoints.addPerLevelModifier(payload.modifier);
	}
}
