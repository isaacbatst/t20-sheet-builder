import {Dwarf} from './Dwarf';
import {Human} from './Human';
import {type RaceName} from './RaceName';
import {type RaceStatic} from './RaceStatic';

export class Races {
	static map: Record<RaceName, RaceStatic> = {
		dwarf: Dwarf,
		human: Human,
	};

	static getAll(): RaceStatic[] {
		return [
			Dwarf,
			Human,
		];
	}

	static getByName(name: RaceName): RaceStatic {
		return Races.map[name];
	}
}
