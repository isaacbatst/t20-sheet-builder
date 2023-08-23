import {type CharacterAttack} from '../Character/CharacterAttack';
import {type CharacterInterface} from '../Character/CharacterInterface';
import {ContextualModifiersListTotalCalculator} from '../Modifier/ContextualModifier/ContextualModifiersListTotalCalculator';
import {Random, type RandomInterface} from '../Random';
import {type Location} from '../Sheet';
import {CharacterContextAbstract} from './CharacterContextAbstract';
import {type ContextType} from './ContextInterface';

export class SheetPreviewContext extends CharacterContextAbstract {
	override type: ContextType = 'outgame';

	constructor(override character: CharacterInterface) {
		super();
	}

	roll(attack: CharacterAttack, random: RandomInterface = new Random()) {
		const totalCalculator = new ContextualModifiersListTotalCalculator(this, this.character.getAttributes());
		return attack.roll(random, totalCalculator);
	}

	getCharacterAttackMaxTotal(attack: CharacterAttack) {
		return attack.getModifiersMaxTotal(this.character.getAttributes());
	}

	getCharacterAttackTotal(attack: CharacterAttack) {
		const totalCalculator = new ContextualModifiersListTotalCalculator(this, this.character.getAttributes());
		return attack.getModifiersTotal(totalCalculator);
	}

	override getCurrentLocation(): Location | undefined {
		return undefined;
	}
}
