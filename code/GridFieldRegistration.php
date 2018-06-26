<?php

namespace SilverStripe\Admin;

use SilverStripe\Core\Injector\Injectable;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldDataColumns;

class GridFieldRegistration
{
    use Injectable;

    /**
     * @var string
     */
    protected $identifier;

    /**
     * @var GridField
     */
    protected $gridField;

    /**
     * GridFieldRegistration constructor.
     * @param string $identifier
     * @param GridField $gridField
     */
    public function __construct($identifier, GridField $gridField)
    {
        $this->identifier = $identifier;
        $this->gridField = $gridField;
    }

    /**
     * @return GridField
     */
    public function getGridField()
    {
        return $this->gridField;
    }

    /**
     * @return string
     */
    public function getIdentifier()
    {
        return $this->identifier;
    }

    /**
     * @return array
     */
    public function getRequiredFields()
    {
        return $this->getGridField()->getColumns();
    }
}