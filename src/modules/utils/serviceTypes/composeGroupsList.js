const createStObj = (stObj, uniqueGroupServiceTypes) => {
  const stChildren = stObj.children;
  const newStObj = { ...stObj, children: [] };

  stChildren.forEach((stChild) => {
    uniqueGroupServiceTypes.forEach((ust) => {
      if (ust === stChild.id) {
        newStObj.children.push(stChild);
      }
    });
  });

  return newStObj;
};

const transformServiceTypeArr = (uniqueGroupServiceTypes, serviceTypesEnums = []) => {
  const uniqueGroupSTObjects = [];

  serviceTypesEnums.forEach((st) => {
    uniqueGroupServiceTypes.forEach((id) => {
      if (st.id === id) {
        const newStObj = createStObj(st, uniqueGroupServiceTypes, serviceTypesEnums);
        uniqueGroupSTObjects.push(newStObj);
      }
    });
  });

  return uniqueGroupSTObjects;
};

const composeGroupServiceTypes = (programs, serviceTypesEnums = []) => {
  const groupServiceTypes = programs.map((program) => {
    // Need to mutate for purpose of function.
    // eslint-disable-next-line no-param-reassign
    program.service_types = transformServiceTypeArr(program.provided_service_type_ids, serviceTypesEnums);

    return program.provided_service_type_ids;
  }).flat();
  const uniqueGroupServiceTypes = [...new Set(groupServiceTypes)];
  const serviceTypeObjArr = transformServiceTypeArr(uniqueGroupServiceTypes, serviceTypesEnums);

  return serviceTypeObjArr;
};

export default (groups, serviceTypesEnums = []) => groups.map((group) => {
  const { programs = [] } = group;
  const newGroup = {
    ...group,
    service_types: composeGroupServiceTypes(programs, serviceTypesEnums),
    // programs: composeGroupPrograms(programs, serviceTypesEnums),
  };
  return newGroup;
});

// TODO: REWORK THIS... INTO ABOVE
function programServiceTypeMapHelper(program, serviceTypes) {
  const newProgram = { ...program };

  const programServiceTypes = program.provided_service_type_ids || program.relationships.services.data || [];

  newProgram.service_types = serviceTypes.filter((st) => {
    const value = programServiceTypes.some(pst => st.id === (pst.id || pst));
    return value;
  });

  newProgram.service_types = newProgram.service_types.map((pst) => {
    const programServiceType = { ...pst };

    programServiceType.children = programServiceType.children.filter((cst) => {
      const value = programServiceTypes.some(ast => cst.id === (ast.id || ast));
      return value;
    });

    return programServiceType;
  });

  return newProgram;
}

export const composeProgramServiceTypes = (programs, serviceTypesEnums) => programs
  .map(program => programServiceTypeMapHelper(program, serviceTypesEnums));
