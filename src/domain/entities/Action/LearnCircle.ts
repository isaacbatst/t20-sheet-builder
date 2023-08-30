import {Translatable} from '../Translatable';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class LearnCircle extends Action<'learnCircle'> {
	constructor(
		params: ActionSubClassParams<'learnCircle'>,
	) {
		super({
			...params,
			type: 'learnCircle',
		});
	}

	override execute(): void {
		const sheetSpells = this.transaction.sheet.getSheetSpells();
		sheetSpells.learnCircle(this.payload.circle, this.payload.type, this.payload.schools);
	}

	override getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const circle = Translator.getSpellCircleTranslation(this.payload.circle);
		const spellType = Translator.getSpellTypeTranslation(this.payload.type);
		const readableSpellType = spellType.toLowerCase().concat('s');
		return `${source}: você pode lançar magias ${readableSpellType} de ${circle} círculo`;
	}
}
