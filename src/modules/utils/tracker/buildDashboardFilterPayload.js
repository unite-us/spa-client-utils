import { forIn, get, find, compact } from 'lodash';
import flattenServiceTypes from '../serviceTypes/flattenServiceTypes';

function findServiceType(serviceTypes, id) {
  return find(serviceTypes, { id });
}

function buildServiceTypeNames(serviceTypes, ids) {
  const serviceTypeNames = ids.map((id) => {
    const serviceType = findServiceType(serviceTypes, id);

    return get(serviceType, 'name');
  });

  return compact(serviceTypeNames);
}

function findCareCoordinator(coordinators, id) {
  return find(coordinators, { user: { id } });
}

function buildCoordinatorObjects(coordinators, ids) {
  const coordinatorsObjects = ids.map((filterId) => {
    const coordinator = findCareCoordinator(coordinators, filterId);

    if (coordinator) {
      return {
        id: get(coordinator, 'user.id'),
        full_name: get(coordinator, 'user.full_name'),
      };
    }

    return null;
  });

  return compact(coordinatorsObjects);
}

export default function buildDashboardFilterPayload(state, props) {
  const filters = {};
  forIn(get(state, 'filters', []), (value, key) => {
    switch (key) {
      case 'service_types': {
        const serviceTypes = flattenServiceTypes(get(props, 'serviceTypes', []), true);
        filters[key] = buildServiceTypeNames(serviceTypes, value);
        break;
      }

      case 'referral_sender_users':
      case 'care_coordinator_users': {
        const coordinators = get(props, 'careCoordinators', []);
        filters[key] = buildCoordinatorObjects(coordinators, value);
        break;
      }

      default:
        filters[key] = value;
    }
  });

  return filters;
}
