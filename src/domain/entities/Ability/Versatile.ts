import type {SkilledCharacter} from '../Character';
import type {SkillNameEnum} from '../Skill/SkillName';
import {Ability} from './Ability';

export class Versatile extends Ability {
	readonly choices: Array<{type: 'skill' | 'power'; name: string}> = [];

	constructor() {
		super(
			'Versátil',
			'Você se torna treinado em duas perícias a sua escolha (não precisam ser da sua classe). Você pode trocar uma dessas perícias por um poder geral a sua escolha.',
			'passive',
		);
	}

	addChoice(newChoice: {type: 'skill' | 'power'; name: string}) {
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

	apply(character: SkilledCharacter): void {
		if (this.choices.length !== 2) {
			throw new Error('MISSING_CHOICES');
		}

		this.choices.forEach(choice => {
			if (choice.type === 'skill') {
				character.trainSkill(choice.name);
			}
		});
	}
}
