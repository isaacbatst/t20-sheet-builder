import type {AttributeModifier} from '../Race';
import {Race} from '../Race';

export class Dwarf extends Race {
	readonly attributeModifiers: AttributeModifier[] = [
		{attribute: 'dexterity', modifier: -1},
		{attribute: 'constitution', modifier: 2},
		{attribute: 'wisdom', modifier: 1},
	];
}
