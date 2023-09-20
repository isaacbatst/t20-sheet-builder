import {type RequirementInterface} from '../entities/Power/Power';
import {SheetBuilderError} from './SheetBuilderError';

export class UnfulfilledRequirementError extends SheetBuilderError {
	override name = 'UnfulfilledRequirementError';

	constructor(readonly requirement: RequirementInterface) {
		const message = `Requisito não preenchido: ${requirement.description}`;
		super(message);
	}
}
