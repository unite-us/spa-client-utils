import {
  reduce,
  toString,
  toNumber,
  find,
  compact,
  isArray,
  map,
  includes,
  isEmpty,
  get,
} from 'lodash';

function test(rule, value) {
  switch (rule.operator) {
    case '=':
      return rule.operator_value === toString(value);
    case 'is':
      return rule.operator_value === toString(value);
    case 'is_not':
      return rule.operator_value !== toString(value);
    case 'greater_than':
      return toNumber(rule.operator_value) < toNumber(value);
    case 'less_than':
      return toNumber(rule.operator_value) > toNumber(value);
    case 'contains':
      return includes(value, rule.operator_value);
    case 'does_not_contain':
      return !includes(value, rule.operator_value);
    case 'is_blank':
      return isEmpty(value);
    case 'is_not_blank':
      return !isEmpty(value);
    default:
      return false;
  }
}

function getValue(values, form, question_id) {
  const section = find(form.sections, sec =>
    find(sec.questions, { id: question_id }) !== undefined,
  );
  if (!section || !values) {
    return null;
  }
  const question = find(section.questions, { id: question_id });
  const value = get(values, `${section.id}.${question_id}`, null);
  if (!value) {
    return value;
  }
  switch (question.input_type) {
    case 'checkbox': {
      const val = compact(map(value, (v, key) => {
        if (v) {
          const opt = find(question.input_options, { id: key });
          if (opt) {
            return opt.option_label;
          }
        }
        return null;
      }));
      if (val.length === 1) {
        return val[0];
      }
      return val;
    }
    case 'radio': {
      const opt = find(question.input_options, { id: value });
      if (opt) {
        return opt.option_label;
      }
      return null;
    }
    case 'select': {
      if (isArray(value)) {
        return map(value, 'option_label');
      }
      return value.option_label;
    }
    default:
      return value;
  }
}

function testAnd(form, rules, values) {
  return reduce(rules, (result, rule) => {
    const value = getValue(values, form, rule.question_id);
    return result && test(rule, value);
  }, true);
}

function testOr(form, rules, values) {
  return reduce(rules, (result, rule) => {
    const value = getValue(values, form, rule.question_id);
    return result || test(rule, value);
  }, false);
}

export default function conditionalDisplay(formData = {}, values = {}) {
  const hiddenFields = reduce(formData.sections, (acc, section) =>
    reduce(section.questions, (accu, question) => {
      if (isEmpty(question.conditional_display)) {
        return accu;
      }
      let result = true;
      result = testAnd(formData, question.conditional_display.and_conditions, values);
      if (!result || (isEmpty(question.conditional_display.and_conditions) && !isEmpty(question.conditional_display.or_conditions))) {
        result = testOr(formData, question.conditional_display.or_conditions, values);
      }
      if ((question.conditional_display.show_or_hide === 'show' && result) || (question.conditional_display.show_or_hide === 'hide' && !result)) {
        return accu;
      }
      return [...accu, question.id];
    }, acc), []);
  return hiddenFields;
}
