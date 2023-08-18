import type {FixedModifiersListInterface} from '../Modifier/FixedModifier/FixedModifiersList';
import {FixedModifiersListFake} from '../Modifier/FixedModifier/FixedModifiersListFake';
import {type ModifierInterface} from '../Modifier/ModifierInterface';
import type {Attributes} from '../Sheet/Attributes';
import type {DefenseInterface} from './DefenseInterface';

export class DefenseFake implements DefenseInterface {
	attribute: keyof Attributes = 'dexterity';
	total = 10;
	fixedModifiers: FixedModifiersListInterface = new FixedModifiersListFake();
	getTotal() {
		return this.total;
	}

	addFixedModifier(modifier: ModifierInterface): void {
		this.fixedModifiers.add(modifier);
	}
}
