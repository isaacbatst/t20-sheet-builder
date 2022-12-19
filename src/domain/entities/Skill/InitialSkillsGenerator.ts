import type {Character} from '../Character';
import {Skill} from './Skill';
import type {SkillNameEnum} from './SkillName';

export class InitialSkillsGenerator {
	static generate(character: Character): Record<SkillNameEnum, Skill> {
		return {
			acrobacia: new Skill({
				attribute: 'dexterity',
				character,
				name: 'acrobacia',
			}),
			adestramento: new Skill({
				attribute: 'charisma',
				character,
				name: 'adestramento',
			}),
			luta: new Skill({
				attribute: 'strength',
				character,
				name: 'luta',
			}),
		};
	}
}
