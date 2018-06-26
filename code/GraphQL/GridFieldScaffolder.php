<?php

namespace SilverStripe\Admin\GraphQL;

use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\Admin\GridFieldRegistration;
use SilverStripe\Admin\GridFieldRegistry;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;

class GridFieldScaffolder implements ScaffoldingProvider
{
    protected $registry;

    public function __construct(GridFieldRegistry $registry)
    {
        $this->registry = $registry;
    }

    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        /* @var GridFieldRegistration $gridFieldRegistration */
        foreach ($this->registry->getAll() as $gridFieldRegistration) {

            $gridField = $gridFieldRegistration->getGridField();
            $identifier = $gridFieldRegistration->getIdentifier();
            $scaffolder->query(
                'readGridField' . $identifier,
                $gridField->getList()->dataClass(), // Warning: assumes DataList
                function ($object, array $args, $context, ResolveInfo $info) use ($gridField) {
                    return $gridField->getList();
                }
            )
                ->addSortableFields($gridField->getColumns());
        }

        return $scaffolder;
    }
}