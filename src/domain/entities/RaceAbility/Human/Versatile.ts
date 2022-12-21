import type {SheetInterface} from '../../SheetInterface';
import {GeneralPowerFactory} from '../../Power/PowerFactory';
import type {PowerName} from '../../Power/PowerName';
import {SkillName} from '../../Skill/SkillName';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';

export type VersatileChoice =
	{type: 'skill'; name: SkillName} |
	{type: 'power'; name: PowerName};

export class Versatile extends RaceAbility {
	readonly choices: VersatileChoice[] = [];

	constructor() {
		super(
			RaceAbilityName.versatile,
			'passive',
		);
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

	apply(sheet: SheetInterface): void {
		if (this.choices.length !== 2) {
			throw new Error('MISSING_CHOICES');
		}

		this.choices.forEach(choice => {
			if (choice.type === 'skill') {
				sheet.dispatch({
					type: 'trainSkill',
					payload: {
						source: this.name,
						name: SkillName[choice.name],
					},
				});
			}

			if (choice.type === 'power') {
				const power = GeneralPowerFactory.make(choice.name);
				sheet.dispatch({type: 'pickPower', payload: {power, source: this.name}});
			}
		});
	}
}
