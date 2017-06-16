export default class {

  constructor(schemaState, formState) {
    this.schemaState = { ...schemaState };
    this.formState = formState;
  }

  getFieldByName(field) {
    return this.schemaState.fields.find(f => f.name === field);
  }

  mutateField(fieldName, updater) {
    const fieldList = this.schemaState.fields || [];
    const fieldIndex = fieldList.findIndex(f => f.name === fieldName);
    if (fieldIndex < 0) {
      return this;
    }
    const field = fieldList[fieldIndex];
    const fields = [...fieldList];
    fields[fieldIndex] = { ...updater(field) };
    this.schemaState.fields = fields;

    return this;
  }

  updateField(fieldName, update) {
    return this.mutateField(fieldName, (field) => ({
      ...field,
      ...update,
    }));
  }

  updateFields(updates) {
    Object.keys(updates).forEach(k => {
      this.updateField(k, updates[k]);
    });

    return this;
  }

  setFieldComponent(fieldName, schemaComponent) {
    return this.updateField(fieldName, { schemaComponent });
  }

  setFieldMessage(fieldName, value, type, extraClass) {
    return this.updateField(fieldName, {
      meta: { error: value },
    });
  }

  setCustomProp(fieldName, propName, propValue) {
    return this.mutateField(fieldName, (field) => ({
      ...field,
      data: {
        ...field.data,
        [propName]: propValue,
      },
    }));
  }

  getState() {
    return this.schemaState;
  }
}
