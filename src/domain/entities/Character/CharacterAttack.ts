import type {Attack} from '../Attack/Attack';
import {ContextualModifiersList} from '../Modifier/ContextualModifier/ContextualModifierList';

export class CharacterAttack {
	constructor(
		readonly attack: Attack,
		readonly modifiers: {
			contextual: ContextualModifiersList;
		} = {
			contextual: new ContextualModifiersList(),
		},
	) {}
}
