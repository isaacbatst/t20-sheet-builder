import {RolePlayEffect} from '../../../Ability';
import {OriginPowerName} from '../OriginPowerName';

export class GradualMemoriesEffect extends RolePlayEffect {
	static readonly description = 'Durante suas aventuras, em determinados mo- mentos a critério do mestre, '
  + 'você pode fazer um teste de Sabedoria (CD 10) para reconhecer pessoas, criaturas ou lugares que tenha '
  + 'encontrado antes de perder a memória.';

	constructor() {
		super(OriginPowerName.gradualMemories, GradualMemoriesEffect.description);
	}
}
