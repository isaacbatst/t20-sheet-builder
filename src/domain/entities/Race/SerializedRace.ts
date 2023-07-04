import {type GeneralPowerName} from '../Power';
import {type Attribute} from '../Sheet';
import {type SkillName} from '../Skill';
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

export type SerializedRace = SerializedHuman | SerializedDwarf | SerializedDahllan;
