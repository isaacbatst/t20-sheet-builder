import {type GeneralPowerName} from '../../../Power';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {type SkillName} from '../../../Skill';
import type {TranslatableName} from '../../../Translator';

export type VersatileChoiceType = 'skill' | 'power';

export abstract class VersatileChoice {
	constructor(readonly name: SkillName | GeneralPowerName, readonly type: VersatileChoiceType) {}

	abstract addToSheet(transaction: TransactionInterface, source: TranslatableName): void;
}
