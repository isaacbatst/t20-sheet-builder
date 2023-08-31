import {type Context} from '../Context';
import {Modifiers, type SerializedModifiers} from '../Modifier/Modifiers';
import {type SheetInterface} from '../Sheet/SheetInterface';

export enum CharacterModifierName {
	attack = 'attack',
	damage = 'damage',
	defense = 'defense',
	armorPenalty = 'armorPenalty',
	skillExceptAttack = 'skillExceptAttack',
	skill = 'skill',
}

export type SerializedCharacterModifiers = Record<CharacterModifierName, SerializedModifiers>;

export class CharacterModifiers {
	readonly attack = new Modifiers();
	readonly damage = new Modifiers();
	readonly defense = new Modifiers();
	readonly armorPenalty = new Modifiers();
	readonly skillExceptAttack = new Modifiers();
	readonly skill = new Modifiers();

	serialize(sheet: SheetInterface, context: Context): SerializedCharacterModifiers {
		return {
			attack: this.attack.serialize(sheet, context),
			damage: this.damage.serialize(sheet, context),
			defense: this.defense.serialize(sheet, context),
			armorPenalty: this.armorPenalty.serialize(sheet, context),
			skillExceptAttack: this.skillExceptAttack.serialize(sheet, context),
			skill: this.skill.serialize(sheet, context),
		};
	}
}
