import type {CharacterInterface} from '../CharacterInterface';
import {GeneralPowerFactory} from '../Power/PowerFactory';
import type {PowerNameEnum} from '../Power/PowerName';
import type {SkillNameEnum} from '../Skill/SkillName';
import {RaceAbility} from './RaceAbility';
import {RaceAbilityNameEnum} from './RaceAbilityName';

export type VersatileChoice =
	{type: 'skill'; name: SkillNameEnum} |
	{type: 'power'; name: PowerNameEnum};

export class Versatile extends RaceAbility {
	readonly choices: VersatileChoice[] = [];

	constructor() {
		super(
			RaceAbilityNameEnum.versatile,
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

	apply(character: CharacterInterface): void {
		if (this.choices.length !== 2) {
			throw new Error('MISSING_CHOICES');
		}

		this.choices.forEach(choice => {
			if (choice.type === 'skill') {
				character.trainSkill(choice.name);
			}

			if (choice.type === 'power') {
				const power = GeneralPowerFactory.make(choice.name);
				power.apply(character);
			}
		});
	}
}
