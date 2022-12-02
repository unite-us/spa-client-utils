const groups = (state = [], action) => {
  switch (action.type) {
    case 'ADD_GROUP': {
      return [...state, {
        id: action.id,
        value: action.value,
        active: action.active,
        disabled: action.disabled,
      }];
    }

    case 'ADD_ALL_GROUPS': {
      return [
        ...state,
        ...action.allGroups,
      ]
    }

    case 'CLEAR_CHOICES': {
      return state.groups = [];
    }

    default: {
      return state;
    }
  }
};

export default groups;
