import type {EffectExecution, SheetInterface} from './SheetInterface';

export class EffectExecutionFake implements EffectExecution {
	execute = jest.fn();
}
