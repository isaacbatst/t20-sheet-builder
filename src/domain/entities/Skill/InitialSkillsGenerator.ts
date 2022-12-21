import type {Attributes} from '../Attributes';
import type {SheetInterface} from '../SheetInterface';
import {Skill} from './Skill';
import type {SkillNameEnum} from './SkillName';

export class InitialSkillsGenerator {
	static generate(): Record<SkillNameEnum, Skill> {
		return {
			acrobatics: new Skill({
				attribute: 'dexterity',
			}),
			animalHandling: new Skill({
				attribute: 'charisma',
			}),
			fight: new Skill({
				attribute: 'strength',
			}),
			reflexes: new Skill({
				attribute: 'dexterity',
			}),
			perception: new Skill({
				attribute: 'wisdom',
			}),
			survival: new Skill({
				attribute: 'wisdom',
			}),
		};
	}
}
