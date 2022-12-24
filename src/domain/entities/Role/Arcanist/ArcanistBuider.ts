import type {SkillName} from '../../Skill/SkillName';
import type {Spell} from '../../Spell/Spell';
import {Arcanist} from './Arcanist';
import type {ArcanistPath} from './ArcanistPath';

export class ArcanistBuilder {
	static chooseSkills(skills: SkillName[]) {
		return {
			choosePath: (path: ArcanistPath) => ArcanistBuilder.choosePath(path, skills),
		};
	}

	private static choosePath(path: ArcanistPath, skills: SkillName[]) {
		return {
			chooseSpells: (spells: Spell[]) => ArcanistBuilder.chooseSpells(skills, path, spells),
		};
	}

	private static chooseSpells(skills: SkillName[], path: ArcanistPath, spells: Spell[]) {
		return new Arcanist(skills, path, spells);
	}
}
