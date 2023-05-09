import {type Proficiency} from './Proficiency';

export type SheetProficienciesInterface = {
	addProficiency(proficiency: Proficiency): void;
	has(proficiency: Proficiency): boolean;
	getProficiencies(): Proficiency[];
};
