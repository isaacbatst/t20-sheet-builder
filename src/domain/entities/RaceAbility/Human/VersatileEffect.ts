import {PassiveEffect} from '../../Ability/PassiveEffect';
import {TrainSkill} from '../../Action/TrainSkill';
import type {GeneralPowerName} from '../../Power/GeneralPowerName';
import {GeneralPowerFactory} from '../../Power/PowerFactory';
import type {SheetBaseInterface} from '../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../Sheet/SheetInterface';
import {SkillName} from '../../Skill/SkillName';
import {RaceAbilityName} from '../RaceAbilityName';
export type VersatileChoice =
	{type: 'skill'; name: SkillName} |
	{type: 'power'; name: GeneralPowerName};

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

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		if (this.choices.length !== 2) {
			throw new Error('MISSING_CHOICES');
		}

		this.choices.forEach(choice => {
			if (choice.type === 'skill') {
				dispatch(new TrainSkill({
					source: this.source,
					name: SkillName[choice.name],
				}));
			}

			if (choice.type === 'power') {
				const power = GeneralPowerFactory.make(choice.name);
				power.addToSheet(sheet, dispatch, this.source);
			}
		});
	}
}
