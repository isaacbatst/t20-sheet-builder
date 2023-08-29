import {Skill} from './Skill';
import {SkillName} from './SkillName';

export class InitialSkillsGenerator {
	static generate(): Record<SkillName, Skill> {
		return {
			acrobatics: new Skill({
				name: SkillName.acrobatics,
				attribute: 'dexterity',
			}),
			acting: new Skill({
				name: SkillName.acting,
				attribute: 'charisma',
			}),
			stealth: new Skill({
				name: SkillName.stealth,
				attribute: 'dexterity',
			}),
			thievery: new Skill({
				name: SkillName.thievery,
				attribute: 'dexterity',
			}),
			gambling: new Skill({
				name: SkillName.gambling,
				attribute: 'charisma',
			}),
			piloting: new Skill({
				name: SkillName.piloting,
				attribute: 'dexterity',
			}),
			animalHandling: new Skill({
				name: SkillName.animalHandling,
				attribute: 'charisma',
			}),
			fight: new Skill({
				name: SkillName.fight,
				attribute: 'strength',
			}),
			reflexes: new Skill({
				name: SkillName.reflexes,
				attribute: 'dexterity',
			}),
			perception: new Skill({
				name: SkillName.perception,
				attribute: 'wisdom',
			}),
			survival: new Skill({
				name: SkillName.survival,
				attribute: 'wisdom',
			}),
			aim: new Skill({
				name: SkillName.aim,
				attribute: 'dexterity',
			}),
			animalRide: new Skill({
				name: SkillName.animalRide,
				attribute: 'dexterity',
			}),
			athletics: new Skill({
				name: SkillName.athletics,
				attribute: 'strength',
			}),
			craft: new Skill({
				name: SkillName.craft,
				attribute: 'intelligence',
			}),
			fortitude: new Skill({
				name: SkillName.fortitude,
				attribute: 'constitution',
			}),
			initiative: new Skill({
				name: SkillName.initiative,
				attribute: 'dexterity',
			}),
			intimidation: new Skill({
				name: SkillName.intimidation,
				attribute: 'charisma',
			}),
			war: new Skill({
				name: SkillName.war,
				attribute: 'intelligence',
			}),
			cheat: new Skill({
				name: SkillName.cheat,
				attribute: 'charisma',
			}),
			diplomacy: new Skill({
				name: SkillName.diplomacy,
				attribute: 'charisma',
			}),
			intuition: new Skill({
				name: SkillName.intuition,
				attribute: 'wisdom',
			}),
			investigation: new Skill({
				name: SkillName.investigation,
				attribute: 'intelligence',
			}),
			knowledge: new Skill({
				name: SkillName.knowledge,
				attribute: 'intelligence',
			}),
			mysticism: new Skill({
				name: SkillName.mysticism,
				attribute: 'intelligence',
			}),
			nobility: new Skill({
				name: SkillName.nobility,
				attribute: 'intelligence',
			}),
			will: new Skill({
				name: SkillName.will,
				attribute: 'wisdom',
			}),
			cure: new Skill({
				name: SkillName.cure,
				attribute: 'wisdom',
			}),
			religion: new Skill({
				name: SkillName.religion,
				attribute: 'wisdom',
			}),
		};
	}
}
