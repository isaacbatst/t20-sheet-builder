import type {Context} from './Context';
import type {SheetInterface} from './SheetInterface';
import type {SkillNameEnum} from './Skill/SkillName';

export class Character {
	constructor(
		readonly sheet: SheetInterface,
		readonly context: Context,
	) {}

	getDefenseTotal() {
		return this.sheet.getDefenseTotal(this.context);
	}

	getSkillTotal(skill: SkillNameEnum) {
		return this.sheet.getSkillTotal(skill, this.context);
	}
}
