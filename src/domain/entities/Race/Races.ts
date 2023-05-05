import {Dwarf} from './Dwarf';
import {Human} from './Human';
import {type RaceStatic} from './RaceStatic';

export class Races {
	static getAll(): RaceStatic[] {
		return [
			Dwarf,
			Human,
		];
	}
}
