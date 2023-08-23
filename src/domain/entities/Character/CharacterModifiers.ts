import {Modifiers} from '../Modifier/Modifiers';

export class CharacterModifiers {
	readonly attack = new Modifiers();
	readonly defense = new Modifiers();
	readonly armorPenalty = new Modifiers();
}
