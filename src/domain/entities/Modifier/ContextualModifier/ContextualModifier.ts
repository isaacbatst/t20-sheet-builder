import type {Attribute} from '../../Sheet/Attributes';
import type {TranslatableName} from '../../Translator';
import type {ContextualModifierInterface} from './ContextualModifierInterface';
import type {ModifierCondition} from './ContextualModifiersListInterface';
import {Modifier} from '../Modifier';

export class ContextualModifier extends Modifier implements ContextualModifierInterface {
	constructor(
		source: TranslatableName,
		value: number,
		readonly condition: ModifierCondition,
		incrementerAttributes?: Set<Attribute>,
	) {
		super(source, value, 'contextual', incrementerAttributes);
	}
}
