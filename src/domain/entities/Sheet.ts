import type {Attributes} from './Attributes';
import type {Context} from './Context';
import {Defense} from './Defense';
import {LifePoints} from './LifePoints';
import {ProgressionStep} from './ProgressionStep';
import type {RaceInterface} from './RaceInterface';
import type {ActionInterface, ActionPayload, ActionType, ActionHandlers} from './SheetActions';
import type {SheetInterface} from './SheetInterface';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import type {Skill} from './Skill/Skill';
import type {SkillName} from './Skill/SkillName';
import {Vision} from './Vision';

type SheetParams = {
	attributes?: Partial<Attributes>;
};

export class Sheet implements SheetInterface {
	static readonly initialAttributes = {strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0};
	readonly progressionSteps: Array<ProgressionStep<ActionType>> = [];
	readonly lifePoints = new LifePoints();
	private attributes: Attributes = Sheet.initialAttributes;
	private race?: RaceInterface;
	// eslint-disable-next-line @typescript-eslint/prefer-readonly
	private level = 1;
	private vision: Vision = Vision.default;
	private displacement = 9;
	private readonly skills: Record<SkillName, Skill>;
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
	};

	constructor(
		params?: SheetParams,
	) {
		this.skills = InitialSkillsGenerator.generate();
		this.dispatch = this.dispatch.bind(this);

		const attributes = params?.attributes ? {...Sheet.initialAttributes, ...params.attributes} : Sheet.initialAttributes;

		this.dispatch({type: 'setInitialAttributes', payload: {attributes}});
	}

	dispatch<T extends ActionType>(action: ActionInterface<T>): void {
		this.progressionSteps.push(new ProgressionStep(action, this));
		const handle = this.actionHandlers[action.type];
		handle(action.payload);
	}

	getDisplacement() {
		return this.displacement;
	}

	getVision(): Vision {
		return this.vision;
	}

	getDefenseTotal(context: Context): number {
		return this.defense.getTotal(this.attributes.dexterity, 0, 0, context);
	}

	getAttributes(): Attributes {
		return this.attributes;
	}

	getSkills() {
		return this.skills;
	}

	getSkillTotal(skill: SkillName, context: Context) {
		return this.skills[skill].getTotal(this.attributes, this.level, context);
	}

	getTrainedSkills(): SkillName[] {
		return Object.entries(this.skills)
			.filter(([name, skill]) => skill.getIsTrained())
			.map(([name]) => name as SkillName);
	}

	getSkillTrainingPoints(skill: SkillName): number {
		return this.skills[skill].getTrainingPoints(this.level);
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
