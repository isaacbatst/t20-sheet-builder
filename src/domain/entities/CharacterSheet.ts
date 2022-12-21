import type {Attributes} from './Attributes';
import type {ActionInterface, ActionPayload, ActionType, CharacterActionHandlers} from './CharacterAction';
import type {Context} from './Context';
import {Defense} from './Defense';
import {ProgressionStep} from './ProgressionStep';
import type {RaceInterface} from './RaceInterface';
import type {SheetInterface} from './SheetInterface';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import type {Skill} from './Skill/Skill';
import type {SkillNameEnum} from './Skill/SkillName';
import {SkillName} from './Skill/SkillName';
import {Vision} from './Vision';

type CharacterParams = {
	initialAttributes: Attributes;
};

export class CharacterSheet implements SheetInterface {
	readonly progressionSteps: Array<ProgressionStep<ActionType>> = [];
	private attributes: Attributes = {charisma: 0, constitution: 0, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0};
	private race?: RaceInterface;
	// eslint-disable-next-line @typescript-eslint/prefer-readonly
	private level = 1;
	private vision: Vision = Vision.default;
	private readonly skills: Record<SkillNameEnum, Skill>;
	private readonly defense = new Defense();
	private readonly actionHandlers: CharacterActionHandlers = {
		addOtherModifierToDefense: this.addOtherModifierToDefense.bind(this),
		addOtherModifierToSkill: this.addOtherModifierToSkill.bind(this),
		chooseRace: this.chooseRace.bind(this),
		trainSkill: this.trainSkill.bind(this),
		changeVision: this.changeVision.bind(this),
		setInitialAttributes: this.setInitialAttributes.bind(this),
		applyRaceModifiers: this.applyRaceModifiers.bind(this),
		applyRaceAbility: this.applyRaceAbility.bind(this),
		pickPower: this.pickPower.bind(this),
	};

	constructor(
		params: CharacterParams,
	) {
		this.skills = InitialSkillsGenerator.generate();
		this.dispatch = this.dispatch.bind(this);

		this.dispatch({type: 'setInitialAttributes', payload: {attributes: params.initialAttributes}});
	}

	dispatch<T extends ActionType>(action: ActionInterface<T>): void {
		this.progressionSteps.push(new ProgressionStep(action, this));
		const handle = this.actionHandlers[action.type];
		handle(action.payload);
	}

	getVision(): Vision {
		return this.vision;
	}

	getDefense(): Defense {
		return this.defense;
	}

	getDefenseTotal(context: Context): number {
		return this.defense.getTotal(this.attributes.dexterity, 0, 0, context);
	}

	getAttributes(): Attributes {
		return this.attributes;
	}

	getRace(): RaceInterface | undefined {
		return this.race;
	}

	getLevel(): number {
		return this.level;
	}

	getSkills() {
		return this.skills;
	}

	getSkillTotal(skill: SkillNameEnum, context: Context) {
		return this.skills[skill].getTotal(this.attributes, this.level, context);
	}

	getTrainedSkills(): SkillNameEnum[] {
		return Object.entries(this.skills)
			.filter(([name, skill]) => skill.getIsTrained())
			.map(([name]) => name as SkillNameEnum);
	}

	getSkillTrainingPoints(skill: SkillNameEnum): number {
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

	private addOtherModifierToDefense(payload: ActionPayload<'addOtherModifierToDefense'>) {
		this.defense.modifierOthers.add({source: payload.source, value: payload.value, condition: payload.condition});
	}

	private addOtherModifierToSkill(payload: ActionPayload<'addOtherModifierToSkill'>): void {
		this.skills[payload.skill].modifierOthers.add({source: payload.source, value: payload.value, condition: payload.condition});
	}

	private chooseRace(payload: ActionPayload<'chooseRace'>) {
		this.race = payload.race;
		this.race.applyAttributesModifiers(this.attributes, this.dispatch);
		this.race.applyAbilities(this);
	}

	private trainSkill(payload: ActionPayload<'trainSkill'>): void {
		const skillName = new SkillName(payload.name);
		const skill = this.skills[skillName.value];
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
}
