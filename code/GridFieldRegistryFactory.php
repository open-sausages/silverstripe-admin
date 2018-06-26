<?php

namespace SilverStripe\Admin;

use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Injector\Factory;
use SilverStripe\Core\Injector\Injector;

class GridFieldRegistryFactory implements Factory
{
    public function create($service, array $params = array())
    {
        $registry = new GridFieldRegistry();
        /* @var GridFieldProvider $provider */
        foreach(ClassInfo::implementorsOf(GridFieldProvider::class) as $provider) {
            Injector::inst()->get($provider)->provideGridFields($registry);
        }

        return $registry;
    }
}