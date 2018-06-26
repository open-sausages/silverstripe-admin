<?php

namespace SilverStripe\Admin;

use SilverStripe\Core\Injector\Injectable;
use SilverStripe\Forms\GridField\GridField;

class GridFieldRegistry
{
    use Injectable;

    /**
     * @var array
     */
    protected $registry = [];

    /**
     * @param $identifier
     * @param GridField $gridField
     * @throws \Exception
     */
    public function add($identifier, GridField $gridField)
    {
        if (isset($this->registry[$identifier])) {
            throw new \Exception('duplicate gridfield registration');
        }

        $this->registry[$identifier] = new GridFieldRegistration(
            $identifier,
            $gridField
        );
    }

    /**
     * @return GridFieldRegistration[]
     */
    public function getAll()
    {
        return array_values($this->registry);
    }

    public function get($id)
    {
        if (isset($this->registry[$id])) {

            return $this->registry[$id]->getGridField()
                // Hack. All gridfield contexts have to be unique
                ->setName($id);
        }
    }

}