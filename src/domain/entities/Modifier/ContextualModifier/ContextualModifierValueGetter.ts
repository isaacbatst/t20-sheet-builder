import type {Attribute, Attributes} from '../../Sheet/Attributes';
import type {ContextInterface} from '../../Context/ContextInterface';
import type {ModifierValueGetterInterface} from '../ModifierInterface';
import {ModifierValueGetter} from '../ModifierValueGetter';
import type {ModifierConditionVerify} from './ContextualModifiersListInterface';
import {InGameContext} from '../../Context/InGameContext';

export class ContextualModifierValueGetter extends ModifierValueGetter implements ModifierValueGetterInterface {
	constructor(
		attributes: Attributes,
		readonly context: ContextInterface,
		readonly verifyCondition: ModifierConditionVerify,
	) {
		super(attributes);
	}

	get(value: number, attributes: Attribute[]): number {
		const bonusesTotal = this.getAttributesBonusesTotal(attributes);

		if (this.context instanceof InGameContext && !this.verifyCondition(this.context)) {
			return 0;
		}

		return value + bonusesTotal;
	}
}
