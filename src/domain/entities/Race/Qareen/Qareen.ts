import {type Attributes} from '../../Sheet';
import {type SpellName} from '../../Spell';
import {Race} from '../Race';
import {type RaceAbility} from '../RaceAbility';
import {RaceName} from '../RaceName';
import {Desires} from './Desires/Desires';
import {ElementalResistance} from './ElementalResistance/ElementalResistance';
import {MysticTattoo} from './MysticTattoo/MysticTattoo';
import {type QareenType} from './QareenType';

export class Qareen extends Race {
	static attributeModifiers: Partial<Attributes> = {
		charisma: 2,
		intelligence: 1,
		wisdom: -1,
	};

	static raceName = RaceName.qareen;

	override attributeModifiers: Partial<Attributes> = Qareen.attributeModifiers;
	override abilities: Record<string, RaceAbility>;

	constructor(readonly qareenType: QareenType, mysticTattooSpell: SpellName) {
		super(Qareen.raceName);
		this.abilities = {
			desires: new Desires(),
			elementalResistance: new ElementalResistance(this.qareenType),
			mysticTattoo: new MysticTattoo(mysticTattooSpell),
		};
	}
}
