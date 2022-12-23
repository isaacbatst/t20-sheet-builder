import type {Attribute} from '../../Attributes';
import {Levels} from '../../Levels';
import type {Proficiency} from '../../Proficiency';
import {SkillName} from '../../Skill/SkillName';
import type {Spell, SpellType} from '../../Spell/Spell';
import {SpellCircle} from '../../Spell/SpellCircle';
import type {ChooseableSkills} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {SpellRole} from '../SpellRole';
import type {ArcanistPathName} from './ArcanistPath';
import {ArcanistPath} from './ArcanistPath';
import {ArcanistSpells} from './ArcanistSpells';

export class Arcanist extends SpellRole {
	static readonly chooseableSkills: ChooseableSkills[] = [{amount: 2, skills: [SkillName.knowledge, SkillName.diplomacy, SkillName.cheat, SkillName.war, SkillName.initiative, SkillName.intimidation, SkillName.intuition, SkillName.investigation, SkillName.nobility, SkillName.craft, SkillName.perception]}];
	readonly levelToMaxCircle: Record<Levels, SpellCircle> = {
		levelOne: SpellCircle.first,
	};

	readonly abilities: {
		levelOne: {
			arcanistPath: ArcanistPath;
			arcanistSpells: ArcanistSpells;
		};
	};

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
	readonly proficiencies: Proficiency[] = [];
	readonly name: RoleName = RoleName.arcanist;
	learnFrequency: 'all' | 'even' | 'odd';
	initialSpells = 3;
	spellType: SpellType = 'arcane';
	spellAttribute: Attribute;

	constructor(chosenSkills: SkillName[], path: ArcanistPathName, spells: Spell[]) {
		super(chosenSkills, Arcanist.chooseableSkills, spells);
		this.abilities = {
			levelOne: {
				arcanistPath: new ArcanistPath(path),
				arcanistSpells: new ArcanistSpells(Levels.levelOne),
			},
		};
		this.spellAttribute = this.abilities.levelOne.arcanistPath.getPathAttribute();
		this.learnFrequency = this.abilities.levelOne.arcanistPath.getPathLearnFrequency();
	}
}
