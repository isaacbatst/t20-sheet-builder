import {Name} from '../Name';

export enum SkillNameEnum {
	acrobacia = 'acrobacia',
	adestramento = 'adestramento',
	luta = 'luta',
}

export class SkillName extends Name<SkillNameEnum> {
	protected isValidName(name: string): name is SkillNameEnum {
		return name in SkillNameEnum;
	}

	protected getInvalidMessage(): string {
		return 'INVALID_SKILL_NAME';
	}
}
