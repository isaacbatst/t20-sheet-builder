import {PassiveEffect} from '../../Ability';
import {ChangeClimbingDisplacement} from '../../Action/ChangeClimbingDisplacement';
import {ChangeVision} from '../../Action/ChangeVision';
import {Vision} from '../../Sheet';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class JointerEffect extends PassiveEffect {
	override description: string = 'Você recebe visão no escuro'
  + ' e deslocamento de escalada igual ao seu deslocamento'
  + ' terrestre.';

	constructor() {
		super(RaceAbilityName.jointer);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new ChangeVision({
			payload: {
				vision: Vision.dark,
				source: this.source,
			},
			transaction,
		}));
		transaction.run(new ChangeClimbingDisplacement({
			payload: {
				climbingDisplacement: transaction.sheet.getSheetDisplacement().getDisplacement(),
				source: this.source,
			},
			transaction,
		}));
	}
}
