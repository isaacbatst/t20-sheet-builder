import {type Attributes} from '../../Sheet';
import {type SpellName} from '../../Spell';
import {Race} from '../Race';
import {type RaceAbility} from '../RaceAbility';
import {RaceName} from '../RaceName';
import {type SerializedQareen} from '../SerializedRace';
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

	static readonly raceName = RaceName.qareen;

	override attributeModifiers: Partial<Attributes> = Qareen.attributeModifiers;
	override abilities: {
		desires: Desires;
		elementalResistance: ElementalResistance;
		mysticTattoo: MysticTattoo;
	};

	constructor(readonly qareenType: QareenType, mysticTattooSpell: SpellName) {
		super(Qareen.raceName);
		this.abilities = {
			desires: new Desires(),
			elementalResistance: new ElementalResistance(this.qareenType),
			mysticTattoo: new MysticTattoo(mysticTattooSpell),
		};
	}

	override serialize(): SerializedQareen {
		return {
			name: Qareen.raceName,
			mysticTattooSpell: this.abilities.mysticTattoo.spell,
			qareenType: this.qareenType,
		};
	}
}
