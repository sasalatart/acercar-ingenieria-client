import { required, maxLength, minLength } from './validators';

const MIN_LENGTH = 10;
const MAX_QUESTION_LENGTH = 255;
const MAX_ANSWER_LENGTH = 1500;

export default t => ({
  required: required(t({ id: 'validations.required' })),

  minLength: minLength(
    t({ id: 'validations.minLength' }, { length: MIN_LENGTH }),
    MIN_LENGTH,
  ),

  maxQuestionLength: maxLength(
    t({ id: 'validations.maxLength' }, { length: MAX_QUESTION_LENGTH }),
    MAX_QUESTION_LENGTH,
  ),

  maxAnswerLength: maxLength(
    t({ id: 'validations.maxLength' }, { length: MAX_ANSWER_LENGTH }),
    MAX_ANSWER_LENGTH,
  ),
});
