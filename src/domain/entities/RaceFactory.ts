import type {Race} from './Race';
import {Dwarf} from './races/Dwarf';

export class RaceFactory {
	static create(race: string): Race {
		if (race === 'dwarf') {
			return new Dwarf();
		}

		throw new Error('UNKNOWN_RACE');
	}
}
