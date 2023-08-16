import {Dahllan} from './Dahllan/Dahllan';
import {Dwarf} from './Dwarf';
import {Elf} from './Elf';
import {Goblin} from './Goblin/';
import {Human} from './Human';
import {Lefeu} from './Lefeu/Lefeu';
import {Minotaur} from './Minotaur';
import {type RaceName} from './RaceName';
import {type RaceStatic} from './RaceStatic';

export class Races {
	static map: Record<RaceName, RaceStatic> = {
		dwarf: Dwarf,
		human: Human,
		dahllan: Dahllan,
		elf: Elf,
		goblin: Goblin,
		lefeu: Lefeu,
		minotaur: Minotaur,
	};

	static getAll(): RaceStatic[] {
		return [
			Dwarf,
			Human,
			Dahllan,
			Elf,
			Goblin,
		];
	}

	static getByName(name: RaceName): RaceStatic {
		return Races.map[name];
	}
}
