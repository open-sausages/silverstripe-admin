<?php

namespace SilverStripe\Admin\GraphQL;

use SilverStripe\GraphQL\Manager;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;

class GraphQLReadQuery extends GraphQLCRUDOperation
{
    protected $template = 'GraphQLReadQuery';

    public function __construct($modelClass, Manager $manager)
    {
        parent::__construct(SchemaScaffolder::READ, $modelClass, $manager);
    }

    public function isMutation()
    {
        return false;
    }


}