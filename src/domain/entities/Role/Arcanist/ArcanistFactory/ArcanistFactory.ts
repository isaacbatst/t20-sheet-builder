import {type SkillName} from '../../../Skill';
import {SpellFactory, type SpellName} from '../../../Spell';
import {type Arcanist} from '../Arcanist';
import {ArcanistBuilder} from '../ArcanistBuider';
import {type ArcanistPathFactory} from '../ArcanistPath/ArcanistPathFactory/ArcanistPathFactory';

export type ArcanistFactoryParams = {
	chosenSkills: SkillName[];
	initialSpells: SpellName[];
};

export class ArcanistFactory {
	private readonly chosenSkills: SkillName[];
	private readonly initialSpells: SpellName[];

	constructor(
		private readonly pathFactory: ArcanistPathFactory,
		params: ArcanistFactoryParams,
	) {
		this.chosenSkills = params.chosenSkills;
		this.initialSpells = params.initialSpells;
	}

	make(): Arcanist {
		const path = this.pathFactory.make();

		return ArcanistBuilder
			.chooseSkills(this.chosenSkills)
			.choosePath(path)
			.chooseSpells(this.initialSpells.map(spellName => SpellFactory.make(spellName)));
	}
}
