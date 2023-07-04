import {Translatable} from '../Translatable';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class LearnSpell extends Action<'learnSpell'> {
	constructor(
		params: ActionSubClassParams<'learnSpell'>,
	) {
		super({
			...params,
			type: 'learnSpell',
		});
	}

	execute(): void {
		const sheetSpells = this.transaction.sheet.getSheetSpells();
		sheetSpells.learnSpell(this.payload.spell, this.payload.needsCircle);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const spell = new Translatable(this.payload.spell.name).getTranslation();
		return `${source}: você aprendeu a magia ${spell}.`;
	}
}
