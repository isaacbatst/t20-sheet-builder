import {EquipmentName} from '../../Inventory';
import {EquipmentClothing} from '../../Inventory/Equipment/EquipmentClothing/EquipmentClothing';
import {GeneralPowerName, OriginPowerName} from '../../Power';
import {SkillName} from '../../Skill';
import {Origin} from '../Origin';
import {type OriginBenefit} from '../OriginBenefit';
import {OriginBenefitFactoryAristocrat} from '../OriginBenefit/OriginBenefitFactory/OriginBenefitFactoryAristocrat';
import {OriginName} from '../OriginName';
import {type SerializedOrigins} from '../SerializedOrigin';

export class Aristocrat extends Origin<SerializedOrigins['aristocrat']> {
	static readonly originName = OriginName.aristocrat;
	static equipments = 'Joia de família no valor de T$ 300, traje da corte.';
	static skills: SkillName[] = [SkillName.diplomacy, SkillName.cheat, SkillName.nobility];
	static generalPowers: GeneralPowerName[] = [GeneralPowerName.command];
	static originPower = OriginPowerName.blueBlood;

	static fromSerialized(serialized: SerializedOrigins['aristocrat']['origin']): Aristocrat {
		const benefitsFactory = new OriginBenefitFactoryAristocrat();
		const benefits = serialized.chosenBenefits.map(benefitsFactory.makeFromSerialized);
		return new Aristocrat(benefits);
	}

	readonly name = Aristocrat.originName;
	constructor(chosenBenefits: Array<OriginBenefit<SerializedOrigins['aristocrat']['originPower']>>) {
		super(chosenBenefits, {
			skills: Aristocrat.skills,
			generalPowers: Aristocrat.generalPowers,
			originPower: Aristocrat.originPower,
		}, [
			new EquipmentClothing(EquipmentName.familyJewel, 300),
		]);
	}

	override serialize(): SerializedOrigins['aristocrat']['origin'] {
		return {
			name: this.name,
			chosenBenefits: this.serializeBenefits(),
			equipments: this.serializeEquipments(),
		};
	}
}
