import {type ContextInterface} from '../Context';
import {Modifiers, type SerializedModifiers} from '../Modifier/Modifiers';
import {type SheetInterface} from '../Sheet/SheetInterface';

export type SerializedCharacterModifiers = {
	attack: SerializedModifiers;
	damage: SerializedModifiers;
	defense: SerializedModifiers;
	armorPenalty: SerializedModifiers;
};

export class CharacterModifiers {
	readonly attack = new Modifiers();
	readonly damage = new Modifiers();
	readonly defense = new Modifiers();
	readonly armorPenalty = new Modifiers();

	serialize(sheet: SheetInterface, context: ContextInterface): SerializedCharacterModifiers {
		return {
			attack: this.attack.serialize(sheet, context),
			damage: this.damage.serialize(sheet, context),
			defense: this.defense.serialize(sheet, context),
			armorPenalty: this.armorPenalty.serialize(sheet, context),
		};
	}
}
