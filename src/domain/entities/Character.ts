import type {Context} from './Context';
import type {SheetInterface} from './Sheet/SheetInterface';
import type {SkillName} from './Skill/SkillName';

export class Character {
	constructor(
		readonly sheet: SheetInterface,
		readonly context: Context,
	) {}

	getDefenseTotal() {
		return this.sheet.getDefenseTotal(this.context);
	}

	getSkillTotal(skill: SkillName) {
		return this.sheet.getSkillTotal(skill, this.context);
	}
}
