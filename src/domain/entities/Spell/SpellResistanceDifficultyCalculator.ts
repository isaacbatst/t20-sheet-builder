import type {Attribute} from '../Attributes';
import type {SheetInterface} from '../Sheet/SheetInterface';

export class SpellResistanceDifficultyCalculator {
	static get baseResistanceDifficulty() {
		return 10;
	}

	static calculate(sheet: SheetInterface, spellsAttribute: Attribute): number {
		const attributes = sheet.getAttributes();
		const spellsAttributeValue = attributes[spellsAttribute];
		return 10 + Math.floor(sheet.getLevel() / 2) + spellsAttributeValue;
	}
}
