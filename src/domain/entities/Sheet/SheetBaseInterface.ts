import type {TriggerEvent} from '../Ability/TriggeredEffect';
import type {Attributes} from '../Attributes';
import type {DefenseInterface} from '../Defense/DefenseInterface';
import type {GeneralPowerMap, RaceAbilityMap, RoleAbilityMap, RolePowerMap, TriggeredEffectMap} from '../Map';
import type {Proficiency} from '../Proficiency';
import type {BuildStepInterface} from '../BuildStep';
import type {Skill} from '../Skill/Skill';
import type {SkillName} from '../Skill/SkillName';
import type {LearnableSpellType, Spell} from '../Spell/Spell';
import type {SpellCircle} from '../Spell/SpellCircle';
import type {SpellName} from '../Spell/SpellName';
import type {Vision} from '../Vision';
import type {ActionInterface, ActionsHandler, ActionType} from './SheetActions';

export type SheetLearnedCircles = Record<LearnableSpellType, Set<SpellCircle>>;
export type SheetSpells = Map<SpellName, Spell>;
export type SheetTriggeredEffects = Record<TriggerEvent, TriggeredEffectMap>;
export type SheetAbilities = {role: RoleAbilityMap; race: RaceAbilityMap};
export type SheetPowers = {general: GeneralPowerMap; role: RolePowerMap};
export type SheetSkills = Record<SkillName, Skill>;

export type SheetBaseInterface = {
	actionHandlers: ActionsHandler;
	buildSteps: BuildStepInterface[];
	initTransaction<T extends ActionType>(action: ActionInterface<T>): void;
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
