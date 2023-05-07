import {SheetBuilderError} from '../Error/SheetBuilderError';
import {AddMoney} from '../Action/AddMoney';
import type {BuildStepInterface} from '../BuildStep';
import {BuildStep} from '../BuildStep';
import type {Defense} from '../Defense/Defense';
import type {DefenseInterface} from '../Defense/DefenseInterface';
import type {Inventory} from '../Inventory/Inventory';
import type {OriginInterface} from '../Origin/Origin';
import type {LifePoints} from '../Points/LifePoints/LifePoints';
import type {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import type {Points} from '../Points/Points';
import type {RaceInterface} from '../Race/RaceInterface';
import type {RoleInterface} from '../Role/RoleInterface';
import type {Spell} from '../Spell/Spell';
import type {Attribute, Attributes} from './Attributes';
import type {Level} from './Levels';
import type {Proficiency} from './Proficiency';
import type {ActionInterface, ActionPayload, ActionsHandler, ActionType} from './SheetActions';
import type {SheetAbilities, SheetBaseInterface, SheetLearnedCircles, SheetPowers, SheetSkills, SheetSpells} from './SheetBaseInterface';
import {SheetInitialEquipmentsAdder} from './SheetInitialEquipmentsAdder';
import type {Dispatch} from './Transaction';
import {Transaction} from './Transaction';
import type {Vision} from './Vision';
export abstract class SheetBase implements SheetBaseInterface {
	readonly actionHandlers: ActionsHandler = {
		addFixedModifierToSkill: this.addFixedModifierToSkill.bind(this),
		chooseRace: this.chooseRace.bind(this),
		trainSkill: this.trainSkill.bind(this),
		changeVision: this.changeVision.bind(this),
		setInitialAttributes: this.setInitialAttributes.bind(this),
		applyRaceModifiers: this.applyRaceModifiers.bind(this),
		applyRaceAbility: this.applyRaceAbility.bind(this),
		pickGeneralPower: this.pickGeneralPower.bind(this),
		pickRolePower: this.pickRolePower.bind(this),
		changeDisplacement: this.changeDisplacement.bind(this),
		addFixedModifierToLifePoints: this.addFixedModifierToLifePoints.bind(this),
		chooseRole: this.chooseRole.bind(this),
		addProficiency: this.addProficiency.bind(this),
		applyRoleAbility: this.applyRoleAbility.bind(this),
		learnCircle: this.learnCircle.bind(this),
		learnSpell: this.learnSpell.bind(this),
		addPerLevelModifierToLifePoints: this.addPerLevelModifierToLifePoints.bind(this),
		addContextualModifierToSkill: this.addContextualModifierToSkill.bind(this),
		addFixedModifierToDefense: this.addFixedModifierToDefense.bind(this),
		addPerLevelModifierToManaPoints: this.addPerLevelModifierToManaPoints.bind(this),
		trainIntelligenceSkills: this.trainIntelligenceSkills.bind(this),
		addEquipment: this.addEquipment.bind(this),
		pickOriginPower: this.pickOriginPower.bind(this),
		chooseOrigin: this.chooseOrigin.bind(this),
		addInitialEquipment: this.addInitialEquipment.bind(this),
		addMoney: this.addMoney.bind(this),
		changeTormentaPowersAttribute: this.changeTormentaPowersAttribute.bind(this),
		decreaseAttribute: this.decreaseAttribute.bind(this),
	};

	abstract readonly buildSteps: BuildStepInterface[];
	protected tormentaPowersAttribute: Attribute = 'charisma';
	protected race?: RaceInterface;
	protected role?: RoleInterface;
	protected origin?: OriginInterface;
	protected abstract readonly powers: SheetPowers;
	protected abstract readonly abilities: SheetAbilities;
	protected abstract attributes: Attributes;
	protected abstract readonly level: Level;
	protected abstract vision: Vision;
	protected abstract readonly proficiencies: Proficiency[];
	protected abstract readonly skills: SheetSkills;
	protected abstract readonly defense: Defense;
	protected abstract readonly spells: SheetSpells;
	protected abstract readonly learnedCircles: SheetLearnedCircles;
	protected abstract displacement: number;
	protected abstract readonly lifePoints: Points;
	protected abstract readonly manaPoints: Points;
	protected abstract inventory: Inventory;
	protected abstract money: number;

	initTransaction<T extends ActionType>(action: ActionInterface<T>): void {
		const transaction = new Transaction();
		transaction.dispatch(action, this);
		this.saveBuildSteps(transaction);
	}

	getRole() {
		return this.role;
	}

	getRace() {
		return this.race;
	}

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

	getLifePoints(): LifePoints {
		return this.lifePoints;
	}

	getManaPoints(): ManaPoints {
		return this.manaPoints;
	}

	getInventory(): Inventory {
		return this.inventory;
	}

	getMoney(): number {
		return this.money;
	}

	getTormentaPowersAttribute(): Attribute {
		return this.tormentaPowersAttribute;
	}

	private saveBuildSteps(transaction: Transaction) {
		while (transaction.actionsQueue.getSize() > 0) {
			const action = transaction.actionsQueue.dequeue();
			this.buildSteps.push(new BuildStep(action, this));
		}
	}

	private addMoney(payload: ActionPayload<'addMoney'>) {
		this.money += payload.quantity;
	}

	private addEquipment(payload: ActionPayload<'addEquipment'>) {
		this.inventory.addEquipment(payload.equipment);
	}

	private changeDisplacement(payload: ActionPayload<'changeDisplacement'>) {
		if (payload.displacement < 0) {
			throw new SheetBuilderError('INVALID_NEGATIVE_DISPLACEMENT');
		}

		this.displacement = payload.displacement;
	}

	private chooseOrigin(payload: ActionPayload<'chooseOrigin'>, dispatch: Dispatch) {
		payload.origin.addToSheet(this, dispatch);
		this.origin = payload.origin;
	}

	private chooseRole(payload: ActionPayload<'chooseRole'>, dispatch: Dispatch) {
		payload.role.addToSheet(this, dispatch);
		this.role = payload.role;
	}

	private chooseRace(payload: ActionPayload<'chooseRace'>, dispatch: Dispatch) {
		payload.race.addToSheet(this, dispatch);
		this.race = payload.race;
	}

	private pickGeneralPower(payload: ActionPayload<'pickGeneralPower'>) {
		return this.powers.general.set(payload.power.name, payload.power);
	}

	private pickRolePower(payload: ActionPayload<'pickRolePower'>) {
		return this.powers.role.set(payload.power.name, payload.power);
	}

	private pickOriginPower(payload: ActionPayload<'pickOriginPower'>) {
		return this.powers.origin.set(payload.power.name, payload.power);
	}

	private setInitialAttributes(payload: ActionPayload<'setInitialAttributes'>) {
		this.attributes = payload.attributes;
	}

	private changeVision(payload: ActionPayload<'changeVision'>): void {
		this.vision = payload.vision;
	}

	private addFixedModifierToLifePoints(payload: ActionPayload<'addFixedModifierToLifePoints'>) {
		this.lifePoints.addModifier(payload.modifier);
	}

	private addFixedModifierToDefense(payload: ActionPayload<'addFixedModifierToDefense'>) {
		this.defense.fixedModifiers.add(payload.modifier);
	}

	private addFixedModifierToSkill(payload: ActionPayload<'addFixedModifierToSkill'>): void {
		this.skills[payload.skill].fixedModifiers.add(payload.modifier);
	}

	private addContextualModifierToSkill(payload: ActionPayload<'addContextualModifierToSkill'>): void {
		this.skills[payload.skill].contextualModifiers.add(payload.modifier);
	}

	private trainSkill(payload: ActionPayload<'trainSkill'>): void {
		const skill = this.skills[payload.name];
		skill.train();
	}

	private addProficiency(payload: ActionPayload<'addProficiency'>) {
		if (this.proficiencies.includes(payload.proficiency)) {
			throw new SheetBuilderError('REPEATED_PROFICIENCY');
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

	private applyRoleAbility(payload: ActionPayload<'applyRoleAbility'>) {
		this.abilities.role.set(payload.ability.name, payload.ability);
	}

	private learnSpell(payload: ActionPayload<'learnSpell'>) {
		if (!this.isSpellCircleLearned(payload.spell)) {
			throw new SheetBuilderError('CIRCLE_NOT_LEARNED');
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

	private addPerLevelModifierToLifePoints(payload: ActionPayload<'addPerLevelModifierToLifePoints'>) {
		this.lifePoints.addPerLevelModifier(payload.modifier);
	}

	private addPerLevelModifierToManaPoints(payload: ActionPayload<'addPerLevelModifierToManaPoints'>) {
		this.manaPoints.addPerLevelModifier(payload.modifier);
	}

	private trainIntelligenceSkills(payload: ActionPayload<'trainIntelligenceSkills'>) {
		if (payload.skills.length !== this.attributes.intelligence) {
			throw new SheetBuilderError('INVALID_INTELLIGENCE_SKILLS');
		}

		payload.skills.forEach(skill => {
			this.skills[skill].train();
		});
	}

	private addInitialEquipment({simpleWeapon, armor, martialWeapon, role, money}: ActionPayload<'addInitialEquipment'>, dispatch: Dispatch) {
		const equipmentsAdder = new SheetInitialEquipmentsAdder({
			simpleWeapon,
			armor,
			martialWeapon,
		});
		equipmentsAdder.addEquipments(dispatch, this, role);
		dispatch(new AddMoney({quantity: money}), this);
	}

	private changeTormentaPowersAttribute({attribute}: ActionPayload<'changeTormentaPowersAttribute'>): void {
		this.tormentaPowersAttribute = attribute;
	}

	private decreaseAttribute(payload: ActionPayload<'decreaseAttribute'>): void {
		this.attributes[payload.attribute] -= payload.quantity;
	}
}
