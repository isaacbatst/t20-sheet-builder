import type {Attribute} from '../../Sheet/Attributes';
import type {Translatable} from '../../Translator';
import {Modifier} from '../Modifier';
import type {ModifierInterface} from '../ModifierInterface';

export type FixedModifierInterface = ModifierInterface;

export class FixedModifier extends Modifier implements ModifierInterface {
	constructor(
		source: Translatable,
		value: number,
		attributeBonuses?: Set<Attribute>,
	) {
		super(source, value, 'fixed', attributeBonuses);
	}
}
