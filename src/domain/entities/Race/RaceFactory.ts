import {SheetBuilderError} from '../../errors';
import {Dahllan} from './Dahllan/Dahllan';
import {Dwarf} from './Dwarf';
import {Elf} from './Elf';
import {Goblin} from './Goblin';
import {Human, VersatileChoiceFactory} from './Human';
import {Lefeu} from './Lefeu';
import {Minotaur} from './Minotaur';
import {Qareen} from './Qareen';
import {type Race} from './Race';
import {type RaceInterface} from './RaceInterface';
import {RaceName} from './RaceName';
import {type SerializedElf, type SerializedDahllan, type SerializedDwarf, type SerializedHuman, type SerializedRace, type SerializedGoblin, type SerializedLefeu, type SerializedQareen} from './SerializedRace';

export class RaceFactory {
	static makeFromSerialized(serializedRace: SerializedRace): RaceInterface {
		switch (serializedRace.name) {
			case RaceName.human:
				return RaceFactory.makeHuman(serializedRace);
			case RaceName.dwarf:
				return RaceFactory.makeDwarf(serializedRace);
			case RaceName.dahllan:
				return RaceFactory.makeDahllan(serializedRace);
			case RaceName.elf:
				return RaceFactory.makeElf(serializedRace);
			case RaceName.goblin:
				return RaceFactory.makeGoblin(serializedRace);
			case RaceName.lefeu:
				return RaceFactory.makeLefeu(serializedRace);
			case RaceName.minotaur:
				return RaceFactory.makeMinotaur(serializedRace);
			case RaceName.qareen:
				return RaceFactory.makeQareen(serializedRace);
			default:
				throw new SheetBuilderError('UNKNOWN_RACE');
		}
	}

	private static makeHuman(serializedRace: SerializedHuman) {
		const choices = serializedRace.versatileChoices.map(choice =>
			VersatileChoiceFactory.make(choice.type, choice.name),
		);
		return new Human(serializedRace.selectedAttributes, choices) as Race;
	}

	private static makeMinotaur(_serializedRace: SerializedRace) {
		return new Minotaur();
	}

	private static makeQareen(serializedRace: SerializedQareen) {
		return new Qareen(serializedRace.qareenType, serializedRace.mysticTattooSpell);
	}

	private static makeElf(_serializedRace: SerializedElf) {
		return new Elf();
	}

	private static makeGoblin(_serializedRace: SerializedGoblin) {
		return new Goblin();
	}

	private static makeDwarf(_serializedRace: SerializedDwarf) {
		return new Dwarf();
	}

	private static makeDahllan(_serializedRace: SerializedDahllan) {
		return new Dahllan();
	}

	private static makeLefeu(serialized: SerializedLefeu) {
		const lefeu = new Lefeu(serialized.selectedAttributes);
		lefeu.addDeformities(serialized.deformityChoices.map(choice => choice.name));
		lefeu.setPreviousRace(serialized.previousRace);
		return lefeu;
	}
}
