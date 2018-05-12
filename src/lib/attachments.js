import omit from 'lodash/omit';
import upperFirst from 'lodash/upperFirst';
import partition from 'lodash/partition';

export function processAttachableFormValues(values, attachmentsKey = 'attachments', destroyedAttachmentsKey) {
  if (!values[attachmentsKey]) return values;

  const finalDestroyedAttachmentsKey = destroyedAttachmentsKey || `destroyed${upperFirst(attachmentsKey)}`;

  const finalValues = omit(values, attachmentsKey);
  const [destroyedAttachments, newAttachments] = partition(values[attachmentsKey], '_destroy');
  finalValues[attachmentsKey] = newAttachments;
  finalValues[finalDestroyedAttachmentsKey] = destroyedAttachments.map(({ id }) => id);
  return finalValues;
}

export default {
  processAttachableFormValues,
};
