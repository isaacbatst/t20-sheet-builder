import type {Attributes} from '../Attributes';
import type {FixedModifiersList} from '../Modifier/FixedModifier/FixedModifiersList';
import {FixedModifiersListFake} from '../Modifier/FixedModifier/FixedModifiersListFake';
import type {DefenseInterface} from './DefenseInterface';

export class DefenseFake implements DefenseInterface {
	attribute: keyof Attributes = 'dexterity';
	total = 10;
	fixedModifiers: FixedModifiersList = new FixedModifiersListFake();
	getTotal() {
		return this.total;
	}
}
