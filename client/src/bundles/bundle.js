require('./exports');
// Legacy translation handler
require('i18n.js');

// Legacy CMS
require('../legacy/sspath.js');
require('../legacy/ssui.core.js');
require('../legacy/LeftAndMain.js');
require('../legacy/LeftAndMain.ActionTabSet.js');
require('../legacy/LeftAndMain.Panel.js');
require('../legacy/LeftAndMain.Tree.js');
require('../legacy/LeftAndMain.Content.js');
require('../legacy/LeftAndMain.EditForm.js');
require('../legacy/LeftAndMain.Menu.js');
require('../legacy/LeftAndMain.Preview.js');
require('../legacy/LeftAndMain.BatchActions.js');
require('../legacy/LeftAndMain.FieldHelp.js');
require('../legacy/LeftAndMain.FieldDescriptionToggle.js');
require('../legacy/LeftAndMain.TreeDropdownField.js');
require('../legacy/AddToCampaignForm.js');
require('../legacy/SecurityAdmin.js');
require('../legacy/ModelAdmin.js');

// Legacy form fields
// Fields used by core legacy UIs, or available to users
// To do: determine better way of using webpack to pull in optional javascript
require('../legacy/ConfirmedPasswordField.js');
require('../legacy/SelectionGroup.js');
require('../legacy/DateField.js');
require('../legacy/ToggleCompositeField.js');
require('../legacy/TreeDropdownField.js');
require('../legacy/DateField.js');
require('../legacy/DatetimeField.js');
require('../legacy/HtmlEditorField.js');
require('../legacy/TabSet.js');
require('../legacy/GridField.js');

require('../boot/index.js');
