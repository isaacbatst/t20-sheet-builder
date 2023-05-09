import {Skill} from '../Skill/Skill';
import {Translatable} from '../Translatable';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class TrainSkill extends Action<'trainSkill'> {
	constructor(
		params: ActionSubClassParams<'trainSkill'>,
	) {
		super({
			...params,
			type: 'trainSkill',
		});
	}

	execute(): void {
		const sheetSkills = this.transaction.sheet.getSheetSkills();
		sheetSkills.trainSkill(this.payload.skill);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const skill = Translator.getSkillTranslation(this.payload.skill);
		const trainingBonus = Skill.calculateTrainedPoints(this.transaction.sheet.getLevel());
		return `${source}: perícia ${skill} treinada, bônus de treino ${trainingBonus}.`;
	}
}
