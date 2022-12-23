import type {Attributes} from './Attributes';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {Defense} from './Defense';
import {LifePoints} from './LifePoints';
import {ManaPoints} from './ManaPoints';
import type {GeneralPowerInterface} from './Power/GeneralPower';
import type {GeneralPowerName} from './Power/GeneralPowerName';
import {Proficiency} from './Proficiency';
import type {BuildStep} from './ProgressionStep';
import type {RaceAbility, RaceAbilityInterface} from './RaceAbility/RaceAbility';
import type {RaceAbilityName} from './RaceAbility/RaceAbilityName';
import type {RaceInterface} from './RaceInterface';
import type {RoleAbility, RoleAbilityInterface} from './Role/RoleAbility';
import type {RoleAbilityName} from './Role/RoleAbilityName';
import type {RoleInterface} from './Role/RoleInterface';
import type {RolePowerInterface} from './Role/RolePower';
import type {RolePowerName} from './Role/RolePowerName';
import type {SheetSkills} from './Sheet';
import {Sheet} from './Sheet';
import type {ActionsHandler, ActionPayload} from './SheetActions';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import {Vision} from './Vision';

type GeneralPowerMap = Map<GeneralPowerName, GeneralPowerInterface>;
type RolePowerMap = Map<RolePowerName, RolePowerInterface>;
type RaceAbilityMap = Map<RaceAbilityName, RaceAbilityInterface>;
type RoleAbilityMap = Map<RoleAbilityName, RoleAbilityInterface>;

export class BuildingSheet implements BuildingSheetInterface {
	readonly buildSteps: BuildStep[] = [];
	readonly lifePoints = new LifePoints();

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
	};

	private race?: RaceInterface;
	private role?: RoleInterface;
	private readonly powers: {general: GeneralPowerMap; role: RolePowerMap} = {general: new Map(), role: new Map()};
	private readonly abilities: {race: RaceAbilityMap; role: RoleAbilityMap} = {race: new Map(), role: new Map()};
	private attributes: Attributes = Sheet.initialAttributes;
	// eslint-disable-next-line @typescript-eslint/prefer-readonly
	private level = 1;
	private vision: Vision = Vision.default;
	private displacement = 9;
	private readonly proficiencies: Proficiency[] = [Proficiency.simple, Proficiency.lightArmor];
	private readonly skills: SheetSkills = InitialSkillsGenerator.generate();
	private readonly defense = new Defense();
	private readonly manaPoints = new ManaPoints();

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

	getLifePoints(): LifePoints {
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
}
