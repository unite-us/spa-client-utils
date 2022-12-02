import { get, find } from 'lodash';

export default function getSlimGroup(config) {
  const groups = get(config, 'user.groups', []);
  const group = find(groups, { group: { id: get(config, 'groupId') } });

  return {
    id: get(group, 'group.id'),
    name: get(group, 'group.name'),
    is_coordination_center: get(config, 'isCoordinationGroup'),
    state: get(group, 'group.state'),
  };
}
