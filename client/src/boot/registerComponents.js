import { Field } from 'redux-form';
import Injector from 'lib/Injector';
import TextField from 'components/TextField/TextField';
import HiddenField from 'components/HiddenField/HiddenField';
import DateField from 'components/DateField/DateField';
import TimeField from 'components/TimeField/TimeField';
import DatetimeField from 'components/DatetimeField/DatetimeField';
import CheckboxField from 'components/CheckboxField/CheckboxField';
import CheckboxSetField from 'components/CheckboxSetField/CheckboxSetField';
import OptionsetField from 'components/OptionsetField/OptionsetField';
import GridField from 'components/GridField/GridField';
import SingleSelectField from 'components/SingleSelectField/SingleSelectField';
import PopoverField from 'components/PopoverField/PopoverField';
import HeaderField from 'components/HeaderField/HeaderField';
import LiteralField from 'components/LiteralField/LiteralField';
import HtmlReadonlyField from 'components/HtmlReadonlyField/HtmlReadonlyField';
import LookupField from 'components/LookupField/LookupField';
import CompositeField from 'components/CompositeField/CompositeField';
import LabelField from 'components/LabelField/LabelField';
import Tabs from 'components/Tabs/Tabs';
import TabItem from 'components/Tabs/TabItem';
import FormAction from 'components/FormAction/FormAction';
import FieldGroup from 'components/FieldGroup/FieldGroup';
import TreeDropdownField from 'components/TreeDropdownField/TreeDropdownField';
import Form from 'components/Form/Form';
import ReduxForm from 'containers/Form/Form';

export default () => {
  Injector.register('TextField', TextField);
  Injector.register('HiddenField', HiddenField);
  Injector.register('DateField', DateField);
  Injector.register('TimeField', TimeField);
  Injector.register('DatetimeField', DatetimeField);
  Injector.register('CheckboxField', CheckboxField);
  Injector.register('CheckboxSetField', CheckboxSetField);
  Injector.register('OptionsetField', OptionsetField);
  Injector.register('GridField', GridField);
  Injector.register('FieldGroup', FieldGroup);
  Injector.register('SingleSelectField', SingleSelectField);
  Injector.register('PopoverField', PopoverField);
  Injector.register('HeaderField', HeaderField);
  Injector.register('LiteralField', LiteralField);
  Injector.register('HtmlReadonlyField', HtmlReadonlyField);
  Injector.register('LookupField', LookupField);
  Injector.register('CompositeField', CompositeField);
  Injector.register('Tabs', Tabs);
  Injector.register('TabItem', TabItem);
  Injector.register('FormAction', FormAction);
  Injector.register('LabelField', LabelField);
  Injector.register('TreeDropdownField', TreeDropdownField);
  Injector.register('Form', Form);
  Injector.register('FormStateMiddleware', (state) => state);
  Injector.register('FormValidationMiddleware', (values, errors) => errors);
  Injector.register('FormSchemaMiddleware', (state) => state);
  Injector.register('ReduxForm', ReduxForm);
  Injector.register('ReduxFormField', Field);
};
