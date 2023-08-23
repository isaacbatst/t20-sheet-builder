import type {Attribute} from '../Sheet/Attributes';
import type {CharacterSheetInterface} from '../Sheet/CharacterSheet/CharacterSheetInterface';

export class SpellResistanceDifficultyCalculator {
	static get baseResistanceDifficulty() {
		return 10;
	}

	static calculate(sheet: CharacterSheetInterface, spellsAttribute: Attribute): number {
		const attributes = sheet.getSheetAttributes().getValues();
		const spellsAttributeValue = attributes[spellsAttribute];
		return 10 + Math.floor(sheet.getLevel() / 2) + spellsAttributeValue;
	}
}
