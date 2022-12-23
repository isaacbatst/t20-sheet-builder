import type {SkillName} from '../../Skill/SkillName';
import type {Spell} from '../../Spell/Spell';
import {Arcanist} from './Arcanist';
import type {ArcanistPathName} from './ArcanistPath';
import {ArcanistPath} from './ArcanistPath';

export class ArcanistBuilder {
	static chooseSkills(skills: SkillName[]) {
		return {
			choosePath: (path: ArcanistPathName) => ArcanistBuilder.choosePath(path, skills),
		};
	}

	private static choosePath(path: ArcanistPathName, skills: SkillName[]) {
		return {
			chooseSpells: (spells: Spell[]) => ArcanistBuilder.chooseSpells(skills, path, spells),
		};
	}

	private static chooseSpells(skills: SkillName[], path: ArcanistPathName, spells: Spell[]) {
		return new Arcanist(skills, path, spells);
	}
}
