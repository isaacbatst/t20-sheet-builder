import {PassiveEffect} from '../../../Ability/PassiveEffect';
import type {SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../../Sheet/Transaction';
import {RaceAbilityName} from '../../RaceAbilityName';
import type {VersatileChoice} from './VersatileChoice';

export class VersatileEffect extends PassiveEffect {
	readonly choices: VersatileChoice[] = [];
	constructor() {
		super(RaceAbilityName.versatile);
	}

	addChoice(newChoice: VersatileChoice) {
		if (this.choices.length >= 2) {
			throw new Error('EXCEEDED_CHOICES_QUANTITY');
		}

		const found = this.choices.find(choice => choice.name === newChoice.name);

		if (found) {
			throw new Error('REPEATED_VERSATILE_CHOICE');
		}

		const isPreviousChoicePower = this.choices.some(choice => choice.type === 'power');

		if (newChoice.type === 'power' && isPreviousChoicePower) {
			throw new Error('FORBIDDEN_TWO_POWERS');
		}

		this.choices.push(newChoice);
	}

	applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		if (this.choices.length !== 2) {
			throw new Error('MISSING_CHOICES');
		}

		this.choices.forEach(choice => {
			choice.addToSheet(sheet, dispatch, this.source);
		});
	}
}
