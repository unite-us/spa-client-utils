import getCCGroupIds from './getCCGroupIds';

const ccGroupId = 'group-1';
const networkId = 'network-1';
const ccGroup = { id: ccGroupId };
const networks = [
  {
    id: networkId,
    coordination_centers: [ccGroup],
  },
  {
    id: 'network-2',
    coordination_centers: [{ id: 'group-2' }],
  },
];

describe('getCCGroupIds', () => {
  it('returns coordination centers for a network given a list of networks', () => {
    expect(getCCGroupIds(networkId, networks)).toEqual([ccGroupId]);
  });

  it('returns empty list for a network given no list of networks', () => {
    expect(getCCGroupIds(networkId, null)).toEqual([]);
  });

  it('returns empty list for no network given a list of networks', () => {
    expect(getCCGroupIds(null, networks)).toEqual([]);
  });
});
