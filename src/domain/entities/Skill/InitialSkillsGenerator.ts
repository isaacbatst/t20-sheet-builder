import type {CharacterInterface} from '../CharacterInterface';
import {Skill} from './Skill';
import type {SkillNameEnum} from './SkillName';

export class InitialSkillsGenerator {
	static generate(character: CharacterInterface): Record<SkillNameEnum, Skill> {
		return {
			acrobatics: new Skill({
				attribute: 'dexterity',
				characterAttributes: character.getAttributes(),
				name: 'acrobatics',
			}),
			animalHandling: new Skill({
				attribute: 'charisma',
				characterAttributes: character.getAttributes(),
				name: 'animalHandling',
			}),
			fight: new Skill({
				attribute: 'strength',
				characterAttributes: character.getAttributes(),
				name: 'fight',
			}),
			reflexes: new Skill({
				attribute: 'dexterity',
				characterAttributes: character.getAttributes(),
				name: 'reflexes',
			}),
			perception: new Skill({
				attribute: 'wisdom',
				characterAttributes: character.getAttributes(),
				name: 'perception',
			}),
			survival: new Skill({
				attribute: 'wisdom',
				characterAttributes: character.getAttributes(),
				name: 'survival',
			}),
		};
	}
}
