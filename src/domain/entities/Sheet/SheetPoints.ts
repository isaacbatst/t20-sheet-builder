import {type ContextInterface} from '../Context';
import {type PerLevelModifiersList, type FixedModifiersListInterface, type PerLevelModifiersListInterface} from '../Modifier';
import {type ModifierInterface} from '../Modifier/ModifierInterface';
import {type PerLevelModifierInterface} from '../Modifier/PerLevelModifier/PerLevelModifierInterface';
import {type Points} from '../Points/Points';
import {PointsMaxCalculatorFactory} from '../Points/PointsMaxCalculatorFactory';
import {type Attributes} from './Attributes';
import {type Level} from './Level';
import {type SerializedSheetPoints} from './SerializedSheet/SerializedSheetInterface';
import {type SheetInterface} from './SheetInterface';
import {type SheetPointsInterface} from './SheetPointsInterface';

export class SheetPoints implements SheetPointsInterface {
	constructor(private readonly points: Points) {}

	serialize(sheet: SheetInterface, context: ContextInterface): SerializedSheetPoints {
		const attributes = sheet.getSheetAttributes().getValues();
		const level = sheet.getLevel();
		return {
			max: this.getMax(attributes, level),
			fixedModifiers: this.getFixedModifiers().serialize(sheet, context),
			perLevelModifiers: this.getPerLevelModifiers().serialize(sheet, context),
		};
	}

	getFixedModifiers(): FixedModifiersListInterface {
		return this.points.fixedModifiers;
	}

	getPerLevelModifiers(): PerLevelModifiersList {
		return this.points.perLevelModifiers;
	}

	getModifiers(): ModifierInterface[] {
		return [
			...this.points.fixedModifiers.modifiers,
			...this.points.perLevelModifiers.modifiers,
		];
	}

	addFixedModifier(modifier: ModifierInterface): void {
		this.points.addModifier(modifier);
	}

	addPerLevelModifier(modifier: PerLevelModifierInterface): void {
		this.points.addPerLevelModifier(modifier);
	}

	getMax(attributes: Attributes, level: Level): number {
		const calculator = PointsMaxCalculatorFactory.make(attributes, level);
		return this.points.getMax(calculator);
	}
}
