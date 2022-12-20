import type {Attributes} from '../Attributes';
import type {CharacterInterface} from '../CharacterInterface';
import {Skill} from './Skill';
import type {SkillNameEnum} from './SkillName';

export class InitialSkillsGenerator {
	static generate(characterAttributes: Attributes): Record<SkillNameEnum, Skill> {
		return {
			acrobatics: new Skill({
				attribute: 'dexterity',
				characterAttributes,
				name: 'acrobatics',
			}),
			animalHandling: new Skill({
				attribute: 'charisma',
				characterAttributes,
				name: 'animalHandling',
			}),
			fight: new Skill({
				attribute: 'strength',
				characterAttributes,
				name: 'fight',
			}),
			reflexes: new Skill({
				attribute: 'dexterity',
				characterAttributes,
				name: 'reflexes',
			}),
			perception: new Skill({
				attribute: 'wisdom',
				characterAttributes,
				name: 'perception',
			}),
			survival: new Skill({
				attribute: 'wisdom',
				characterAttributes,
				name: 'survival',
			}),
		};
	}
}
