import type {CharacterInterface} from '../CharacterInterface';
import {Skill} from './Skill';
import type {SkillNameEnum} from './SkillName';

export class InitialSkillsGenerator {
	static generate(character: CharacterInterface): Record<SkillNameEnum, Skill> {
		return {
			acrobacia: new Skill({
				attribute: 'dexterity',
				characterAttributes: character.getAttributes(),
				name: 'acrobacia',
			}),
			adestramento: new Skill({
				attribute: 'charisma',
				characterAttributes: character.getAttributes(),
				name: 'adestramento',
			}),
			luta: new Skill({
				attribute: 'strength',
				characterAttributes: character.getAttributes(),
				name: 'luta',
			}),
			reflexos: new Skill({
				attribute: 'dexterity',
				characterAttributes: character.getAttributes(),
				name: 'reflexos',
			}),
		};
	}
}
