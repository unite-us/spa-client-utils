const SERVICE_TYPE_ICONS = {
  'UU-BENEFITS': 'Benefits',
  'UU-CLOTHING': 'ClothingHouseholdGoods',
  'UU-EDUCATION': 'Education',
  'UU-EMPLOYMENT': 'Employment',
  'UU-ENTREPRENEURSHIP': 'Entrepreneurship',
  'UU-FOOD': 'Food',
  'UU-HEALTH': 'MedicalHealth',
  'UU-HOUSING': 'HousingShelter',
  'UU-INCOME-SUPPORT': 'IncomeSupport',
  'UU-SUPPORT-SERVICES': 'IndvFamSupport',
  'UU-LEGAL': 'Legal',
  'UU-MEDICAL-HEALTH': 'MedicalHealth',
  'UU-MENTAL-BEHAVIORAL-HEALTH': 'MentalHealth',
  'UU-MONEY-MANAGEMENT': 'MoneyManagement',
  'UU-SOCIAL-ENRICHMENT': 'PersonalEnrichment',
  'UU-SPIRITUAL': 'SpiritualEnrichment',
  'UU-SPORTS': 'SportsRecreation',
  'UU-SUBSTANCE-USE': 'Substance',
  'UU-TRANSPORTATION': 'Transportation',
  'UU-UTILITIES': 'Utilities',
  'UU-WELLNESS': 'Wellness',
};

const DEFAULT_SERVICE_TYPE_ICON = 'LogoShield';

export default function getIcon(code) {
  return SERVICE_TYPE_ICONS[code] || DEFAULT_SERVICE_TYPE_ICON;
}
