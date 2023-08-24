import {PreviewContextError} from '../../errors/PreviewContextError';
import {type SerializedCharacter} from '../Character';
import {type CharacterAttack} from '../Character/CharacterAttack';
import {type CharacterInterface} from '../Character/CharacterInterface';
import {FixedModifiersListTotalCalculator, PerLevelModifiersListTotalCalculator} from '../Modifier';
import {ContextualModifiersListTotalCalculator} from '../Modifier/ContextualModifier/ContextualModifiersListTotalCalculator';
import {type ModifiersMaxTotalCalculators, type ModifiersTotalCalculators} from '../Modifier/Modifiers';
import {Random, type RandomInterface} from '../Random';
import {type Attribute, type Location} from '../Sheet';
import {type SheetInterface} from '../Sheet/SheetInterface';
import {SkillTotalCalculatorFactory} from '../Skill/SkillTotalCalculatorFactory';
import {type ContextType} from './ContextInterface';
import {PreviewContextAbstract} from './PreviewContextAbstract';

export class PreviewContext extends PreviewContextAbstract {
	override type: ContextType = 'outgame';

	constructor(override character?: CharacterInterface) {
		super();
	}

	roll(attack: CharacterAttack, random: RandomInterface = new Random()) {
		return attack.roll(random, this.makeTotalCalculators());
	}

	changeAttackTestAttribute(attack: CharacterAttack, attribute: Attribute) {
		if (!this.character) {
			throw new PreviewContextError('CHARACTER_NOT_DEFINED');
		}

		const skillTotalCalculator = SkillTotalCalculatorFactory.make(this.character.getAttributes(), this.character.sheet.getLevel(), this);
		this.character.changeAttackTestAttribute(attack, attribute, skillTotalCalculator);
	}

	getAttacks() {
		if (!this.character) {
			throw new PreviewContextError('CHARACTER_NOT_DEFINED');
		}

		const skillTotalCalculator = SkillTotalCalculatorFactory.make(this.character.getAttributes(), this.character.sheet.getLevel(), this);
		return this.character.getAttacks(skillTotalCalculator);
	}

	getAttackTestModifiersMaxTotal(attack: CharacterAttack) {
		if (!this.character) {
			throw new PreviewContextError('CHARACTER_NOT_DEFINED');
		}

		return attack.getTestModifiersMaxTotal(this.character.getAttributes(), this.makeMaxTotalCalculators());
	}

	getAttackTestModifiersTotal(attack: CharacterAttack) {
		return attack.getTestModifiersTotal(this.makeTotalCalculators());
	}

	getAttackDamageModifiersMaxTotal(attack: CharacterAttack) {
		if (!this.character) {
			throw new PreviewContextError('CHARACTER_NOT_DEFINED');
		}

		return attack.getDamageModifiersMaxTotal(this.character.getAttributes(), this.makeMaxTotalCalculators());
	}

	getAttackDamageModifiersTotal(attack: CharacterAttack) {
		return attack.getDamageModifiersTotal(this.makeTotalCalculators());
	}

	override getCurrentLocation(): Location | undefined {
		return undefined;
	}

	private makeSkillTotalCalculator(sheet: SheetInterface) {
		return SkillTotalCalculatorFactory.make(
			sheet.getSheetAttributes().getValues(),
			sheet.getLevel(),
			this,
		);
	}

	private makeMaxTotalCalculators(): ModifiersMaxTotalCalculators {
		if (!this.character) {
			throw new PreviewContextError('CHARACTER_NOT_DEFINED');
		}

		return {
			fixedCalculator: new FixedModifiersListTotalCalculator(this.character.getAttributes()),
			perLevelCalculator: new PerLevelModifiersListTotalCalculator(this.character.getAttributes(), this.character.sheet.getLevel()),
		};
	}

	private makeTotalCalculators(): ModifiersTotalCalculators {
		if (!this.character) {
			throw new PreviewContextError('CHARACTER_NOT_DEFINED');
		}

		return {
			...this.makeMaxTotalCalculators(),
			contextCalculator: new ContextualModifiersListTotalCalculator(this, this.character.getAttributes()),
		};
	}
}
