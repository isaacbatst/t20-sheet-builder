import {type GeneralPowerName} from '../Power';
import {type Attribute} from '../Sheet';
import {type SkillName} from '../Skill';
import {type SpellName} from '../Spell';
import {type QareenType} from './Qareen';
import {type RaceName} from './RaceName';

export type SerializedVersatileChoiceSkill = {
	name: SkillName;
	type: 'skill';
};

export type SerializedVersatileChoicePower = {
	name: GeneralPowerName;
	type: 'power';
};

export type SerializedVersatileChoice = SerializedVersatileChoiceSkill | SerializedVersatileChoicePower;

export type SerializedHuman = {
	name: RaceName.human;
	selectedAttributes: Attribute[];
	versatileChoices: SerializedVersatileChoice[];
};

export type SerializedDwarf = {
	name: RaceName.dwarf;
};

export type SerializedDahllan = {
	name: RaceName.dahllan;
};

export type SerializedGoblin = {
	name: RaceName.goblin;
};

export type SerializedElf = {
	name: RaceName.elf;
};

export type SerializedMinotaur = {
	name: RaceName.minotaur;
};

type SerializedDeformityChoice = {
	type: 'skill';
	name: SkillName;
};

export type SerializedLefeu = {
	name: RaceName.lefeu;
	selectedAttributes: Attribute[];
	previousRace: RaceName;
	deformityChoices: SerializedDeformityChoice[];
};

export type SerializedQareen = {
	name: RaceName.qareen;
	mysticTattooSpell: SpellName;
	qareenType: QareenType;
};

export type SerializedRace =
	SerializedHuman
	| SerializedDwarf
	| SerializedDahllan
	| SerializedElf
	| SerializedGoblin
	| SerializedMinotaur
	| SerializedLefeu
	| SerializedQareen;
