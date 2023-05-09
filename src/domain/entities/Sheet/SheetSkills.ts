import {type ContextualModifierInterface} from '../Modifier/ContextualModifier/ContextualModifierInterface';
import {type ModifierInterface} from '../Modifier/ModifierInterface';
import {type SkillName} from '../Skill';
import {InitialSkillsGenerator} from '../Skill/InitialSkillsGenerator';
import {type Skill} from '../Skill/Skill';
import {type SheetSkillsInterface} from './SheetSkillsInterface';

export class SheetSkills implements SheetSkillsInterface {
	constructor(
		private readonly skills = InitialSkillsGenerator.generate(),
	) {}

	trainSkill(name: SkillName): void {
		this.skills[name].train();
	}

	addContextualModifierTo(skill: SkillName, modifier: ContextualModifierInterface): void {
		this.skills[skill].addContextualModifier(modifier);
	}

	addFixedModifierTo(skill: SkillName, modifier: ModifierInterface): void {
		this.skills[skill].addFixedModifier(modifier);
	}

	trainIntelligenceSkills(skills: SkillName[]): void {
		skills.forEach(skill => {
			this.skills[skill].train();
		});
	}

	getSkills(): Record<SkillName, Skill> {
		return this.skills;
	}
}
