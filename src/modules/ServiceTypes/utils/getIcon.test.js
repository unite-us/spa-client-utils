import getIcon from './getIcon';

const serviceTypes = [
  { code: 'UU-BENEFITS', name: 'Benefits' },
  { code: 'UU-CLOTHING', name: 'ClothingHouseholdGoods' },
  { code: 'UU-EDUCATION', name: 'Education' },
  { code: 'UU-EMPLOYMENT', name: 'Employment' },
  { code: 'UU-ENTREPRENEURSHIP', name: 'Entrepreneurship' },
  { code: 'UU-FOOD', name: 'Food' },
  { code: 'UU-HEALTH', name: 'MedicalHealth' },
  { code: 'UU-HOUSING', name: 'HousingShelter' },
  { code: 'UU-INCOME-SUPPORT', name: 'IncomeSupport' },
  { code: 'UU-SUPPORT-SERVICES', name: 'IndvFamSupport' },
  { code: 'UU-LEGAL', name: 'Legal' },
  { code: 'UU-MEDICAL-HEALTH', name: 'MedicalHealth' },
  { code: 'UU-MENTAL-BEHAVIORAL-HEALTH', name: 'MentalHealth' },
  { code: 'UU-MONEY-MANAGEMENT', name: 'MoneyManagement' },
  { code: 'UU-SOCIAL-ENRICHMENT', name: 'PersonalEnrichment' },
  { code: 'UU-SPIRITUAL', name: 'SpiritualEnrichment' },
  { code: 'UU-SPORTS', name: 'SportsRecreation' },
  { code: 'UU-SUBSTANCE-USE', name: 'Substance' },
  { code: 'UU-TRANSPORTATION', name: 'Transportation' },
  { code: 'UU-UTILITIES', name: 'Utilities' },
  { code: 'UU-WELLNESS', name: 'Wellness' },
];

describe('getIcon', () => {
  serviceTypes.forEach((serviceType) => {
    it(`returns ${serviceType.name} when passed ${serviceType.code}`, () => {
      expect(getIcon(serviceType.code)).toBe(serviceType.name);
    });
  });

  it('returns a default Icon string name if an unknown code is passed', () => {
    expect(getIcon('UU-NON-VALID-CODE')).toBe('LogoShield');
  });
});

