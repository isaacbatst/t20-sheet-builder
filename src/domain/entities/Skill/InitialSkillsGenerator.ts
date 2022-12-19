import type {Character} from '../Character';
import {Skill} from './Skill';
import type {SkillName} from './SkillName';

export class InitialSkillsGenerator {
	static generate(character: Character): Record<SkillName, Skill> {
		return {
			acrobacia: new Skill({
				attribute: 'dexterity',
				character,
			}),
			adestramento: new Skill({
				attribute: 'charisma',
				character,
			}),
			luta: new Skill({
				attribute: 'strength',
				character,
			}),
		};
	}
}
