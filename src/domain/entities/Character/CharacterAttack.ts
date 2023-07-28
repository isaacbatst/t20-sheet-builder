import type {Attack} from '../Attack/Attack';
import {type ContextInterface} from '../Context';
import {ContextualModifiersList} from '../Modifier/ContextualModifier/ContextualModifierList';
import {type SheetInterface} from '../Sheet/SheetInterface';

type Modifiers = {
	contextual: ContextualModifiersList;
};

export class CharacterAttack {
	constructor(
		readonly attack: Attack,
		readonly modifiers: Modifiers = {
			contextual: new ContextualModifiersList(),
		},
	) {}

	serialize(sheet: SheetInterface, context: ContextInterface) {
		return {
			attack: this.attack.serialize(),
			modifiers: this.modifiers.contextual.serialize(sheet, context),
		};
	}
}
