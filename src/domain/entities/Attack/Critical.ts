import {SheetBuilderError} from '../../errors/SheetBuilderError';

export type SerializedCritical = {
	threat: number;
	multiplier: number;
};

export class Critical {
	constructor(
		readonly threat = 20,
		readonly multiplier = 2,
	) {
		this.validateThreat(threat);
		this.validateMultiplier(multiplier);
	}

	serialize(): SerializedCritical {
		return {
			threat: this.threat,
			multiplier: this.multiplier,
		};
	}

	private validateThreat(threat: number) {
		if (threat < 0) {
			throw new SheetBuilderError('INVALID_NEGATIVE_THREAT');
		}

		if (threat > 20) {
			throw new SheetBuilderError('INVALID_MAX_THREAT_EXCEEDED');
		}
	}

	private validateMultiplier(multiplier: number) {
		if (multiplier < 2) {
			throw new SheetBuilderError('INVALID_MIN_MULTIPLIER');
		}
	}
}
