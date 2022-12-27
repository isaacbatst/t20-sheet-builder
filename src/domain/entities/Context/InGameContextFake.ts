import type {ContextType} from '../ContextInterface';
import type {ModifierConditionVerify} from '../Modifier/ContextualModifier/ContextualModifiersListInterface';
import type {Location} from '../Sheet/SheetInterface';
import type {InGameContextInterface} from './InGameContextInterface';

export class InGameContextFake implements InGameContextInterface {
	type: ContextType = 'ingame';
	shouldActivateModifierValue = true;
	location: Location = {isUnderground: true};

	shouldActivateModifier(verify: ModifierConditionVerify): boolean {
		return verify(this);
	}

	getCurrentLocation(): Location {
		return this.location;
	}
}
