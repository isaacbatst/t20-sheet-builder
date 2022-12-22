import type {Proficiency} from '../Proficiency';
import {SkillName} from '../Skill/SkillName';
import {Role} from './Role';
import type {ChooseableSkills} from './RoleInterface';
import {RoleName} from './RoleName';

export class Arcanist extends Role {
	get initialLifePoints() {
		return 8;
	}

	get lifePointsPerLevel() {
		return 2;
	}

	get manaPerLevel() {
		return 6;
	}

	readonly mandatorySkills: SkillName[] = [SkillName.mysticism, SkillName.will];
	readonly chooseableSkills: ChooseableSkills[] = [{amount: 2, skills: [SkillName.knowledge, SkillName.diplomacy, SkillName.cheat, SkillName.war, SkillName.initiative, SkillName.intimidation, SkillName.intuition, SkillName.investigation, SkillName.nobility, SkillName.craft, SkillName.perception]}];
	readonly proficiencies: Proficiency[] = [];
	readonly name: RoleName = RoleName.arcanist;
}
