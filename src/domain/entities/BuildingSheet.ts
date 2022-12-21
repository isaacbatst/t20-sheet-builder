import type {Attributes} from './Attributes';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {Defense} from './Defense';
import {LifePoints} from './LifePoints';
import {BuildStep} from './ProgressionStep';
import type {RaceInterface} from './RaceInterface';
import type {RoleInterface} from './Role/RoleInterface';
import type {SheetSkills} from './Sheet';
import {Sheet} from './Sheet';
import type {ActionHandlers, ActionInterface, ActionPayload, ActionType} from './SheetActions';
import type {Dispatch} from './SheetInterface';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import {Vision} from './Vision';

export class BuildingSheet implements BuildingSheetInterface {
	readonly buildSteps: BuildStep[] = [];
	readonly lifePoints = new LifePoints();
	private race?: RaceInterface;
	private role?: RoleInterface;
	private attributes: Attributes = Sheet.initialAttributes;
	// eslint-disable-next-line @typescript-eslint/prefer-readonly
	private level = 1;
	private vision: Vision = Vision.default;
	private displacement = 9;
	private readonly skills: SheetSkills = InitialSkillsGenerator.generate();
	private readonly defense = new Defense();

	private readonly actionHandlers: ActionHandlers = {
		addOtherModifierToDefense: this.addOtherModifierToDefense.bind(this),
		addOtherModifierToSkill: this.addOtherModifierToSkill.bind(this),
		chooseRace: this.chooseRace.bind(this),
		trainSkill: this.trainSkill.bind(this),
		changeVision: this.changeVision.bind(this),
		setInitialAttributes: this.setInitialAttributes.bind(this),
		applyRaceModifiers: this.applyRaceModifiers.bind(this),
		applyRaceAbility: this.applyRaceAbility.bind(this),
		pickPower: this.pickPower.bind(this),
		changeDisplacement: this.changeDisplacement.bind(this),
		addModifierToLifePoints: this.addModifierToLifePoints.bind(this),
		chooseRole: this.chooseRole.bind(this),
	};

	constructor(attributes?: Partial<Attributes>) {
		const initialAttributes = attributes ? {...Sheet.initialAttributes, ...attributes} : Sheet.initialAttributes;

		this.dispatch({
			type: 'setInitialAttributes',
			payload: {
				attributes: initialAttributes,
			},
		});
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

	dispatch: Dispatch = <T extends ActionType>(buildStep: ActionInterface<T>): void => {
		this.buildSteps.push(new BuildStep(buildStep, this));
		const handle = this.actionHandlers[buildStep.type];
		handle(buildStep.payload);
	};

	getAttributes() {
		return this.attributes;
	}

	private chooseRole(payload: ActionPayload<'chooseRole'>) {
		this.role = payload.role;
	}

	private pickPower(payload: ActionPayload<'pickPower'>) {
		payload.power.apply(this);
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

	private chooseRace(payload: ActionPayload<'chooseRace'>) {
		this.race = payload.race;
		this.race.applyAttributesModifiers(this.attributes, this.dispatch);
		this.race.applyAbilities(this);
	}

	private trainSkill(payload: ActionPayload<'trainSkill'>): void {
		const skill = this.skills[payload.name];
		skill.train();
	}

	private applyRaceModifiers(payload: ActionPayload<'applyRaceModifiers'>) {
		this.attributes = {
			...this.attributes,
			...payload.updatedAttributes,
		};
	}

	private applyRaceAbility(payload: ActionPayload<'applyRaceAbility'>) {
		payload.ability.apply(this);
	}

	private changeDisplacement(payload: ActionPayload<'changeDisplacement'>) {
		if (payload.displacement < 0) {
			throw new Error('INVALID_NEGATIVE_DISPLACEMENT');
		}

		this.displacement = payload.displacement;
	}
}
