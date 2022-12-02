import _ from 'lodash';

export function getUserGroups(user) {
  return _.get(user, 'groups', []);
}

function buildSlimUser(user) {
  return _.uuPick(user, [
    'email',
    'first_name',
    'id',
    'impersonation_type',
    'last_name',
  ]);
}

function buildSlimNetworks(user) {
  return _.get(user, 'networks', []).map(network => ({ id: network.id, name: network.name }));
}

function buildSlimGroupRoles(group) {
  const roles = _.get(group, 'roles', []);
  return roles.reduce((acc, role) => {
    if (acc.includes(role.name)) {
      return acc;
    }
    return [...acc, role.name];
  }, []);
}

export function getSlimUser(user, slimGroup) {
  const group = _.find(_.get(user, 'groups', []), { group: { id: _.get(slimGroup, 'id') } });

  return {
    ...buildSlimUser(user),
    networks: buildSlimNetworks(user),
    roles: buildSlimGroupRoles(group),
  };
}
