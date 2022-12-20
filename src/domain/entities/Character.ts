import type {Attributes} from './Attributes';
import {BuildContext} from './BuildContext';
import type {Action, CharacterAction, CharacterActionHandlers, CharacterActionPayload} from './CharacterAction';
import type {CharacterInterface} from './CharacterInterface';
import type {Context} from './Context';
import {Defense} from './Defense';
import {ProgressionStep} from './ProgressionStep';
import type {RaceAbilityNameEnum} from './RaceAbility/RaceAbilityName';
import type {RaceInterface} from './RaceInterface';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import type {Skill} from './Skill/Skill';
import type {SkillNameEnum} from './Skill/SkillName';
import {SkillName} from './Skill/SkillName';
import {Vision} from './Vision';

type CharacterParams = {
	initialAttributes: Attributes;
	context?: Context;
};

export class Character implements CharacterInterface {
	readonly progressionSteps: Array<ProgressionStep<CharacterAction>> = [];
	private attributes: Attributes = {charisma: 0, constitution: 0, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0};
	private race?: RaceInterface;
	// eslint-disable-next-line @typescript-eslint/prefer-readonly
	private level = 1;
	private vision: Vision = Vision.default;
	private readonly skills: Record<SkillNameEnum, Skill>;
	private readonly defense = new Defense();
	private readonly context: Context;
	private readonly abilities: RaceAbilityNameEnum[] = [];
	private readonly actionHandlers: CharacterActionHandlers = {
		addOtherModifierToDefense: this.addOtherModifierToDefense,
		addOtherModifierToSkill: this.addOtherModifierToSkill,
		chooseRace: this.chooseRace,
		trainSkill: this.trainSkill,
		changeVision: this.changeVision,
		setInitialAttributes: this.setInitialAttributes,
		applyRaceModifiers: this.applyRaceModifiers,
		applyRaceAbility: this.applyRaceAbility,
		pickPower: this.pickPower,
	};

	constructor(
		params: CharacterParams,
	) {
		this.context = params.context ?? new BuildContext();
		this.skills = InitialSkillsGenerator.generate();

		this.dispatch({type: 'setInitialAttributes', payload: {attributes: params.initialAttributes}});
	}

	dispatch<T extends CharacterAction>(action: Action<T>): void {
		const handle = this.actionHandlers[action.type];
		handle(action.payload);
		this.progressionSteps.push(new ProgressionStep(action, this));
	}

	getVision(): Vision {
		return this.vision;
	}

	getContext(): Context {
		return this.context;
	}

	getDefense(): Defense {
		return this.defense;
	}

	getDefenseTotal(): number {
		return this.defense.getTotal(this.attributes.dexterity, 0, 0, this.context);
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

	getSkillTotal(skill: SkillNameEnum) {
		return this.skills[skill].getTotal(this.level, this.context);
	}

	getTrainedSkills(): SkillNameEnum[] {
		return Object.entries(this.skills)
			.filter(([name, skill]) => skill.getIsTrained())
			.map(([name]) => name as SkillNameEnum);
	}

	private pickPower(payload: CharacterActionPayload<'pickPower'>) {
		payload.power.apply(this);
	}

	private setInitialAttributes(payload: CharacterActionPayload<'setInitialAttributes'>) {
		this.attributes = payload.attributes;
	}

	private changeVision(payload: CharacterActionPayload<'changeVision'>): void {
		this.vision = payload.vision;
	}

	private addOtherModifierToDefense(payload: CharacterActionPayload<'addOtherModifierToDefense'>) {
		this.defense.modifierOthers.add({source: payload.source, value: payload.value, condition: payload.condition});
	}

	private addOtherModifierToSkill(payload: CharacterActionPayload<'addOtherModifierToSkill'>): void {
		this.skills[payload.skill].modifierOthers.add({source: payload.source, value: payload.value, condition: payload.condition});
	}

	private chooseRace(payload: CharacterActionPayload<'chooseRace'>) {
		this.race = payload.race;
		this.race.applyAttributesModifiers(this.attributes, this.dispatch);
		this.race.applyAbilities(this);
	}

	private trainSkill(payload: CharacterActionPayload<'trainSkill'>): void {
		const skillName = new SkillName(payload.name);
		const skill = this.skills[skillName.value];
		skill.train();
	}

	private applyRaceModifiers(payload: CharacterActionPayload<'applyRaceModifiers'>) {
		this.attributes = {
			...this.attributes,
			...payload.updatedAttributes,
		};
	}

	private applyRaceAbility(payload: CharacterActionPayload<'applyRaceAbility'>) {
		payload.ability.apply(this);
	}
}
