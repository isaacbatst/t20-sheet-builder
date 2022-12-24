import type {SpellRoleInterface} from '../Role/SpellRole';
import type {SheetInterface} from '../Sheet/SheetInterface';

export class SpellResistanceDifficultyCalculator {
	static get baseResistanceDifficulty() {
		return 10;
	}

	static calculate(sheet: SheetInterface, role: SpellRoleInterface): number {
		const attributes = sheet.getAttributes();
		const spellsAttributeValue = attributes[role.spellsAttribute];
		return 10 + Math.floor(sheet.getLevel() / 2) + spellsAttributeValue;
	}
}
