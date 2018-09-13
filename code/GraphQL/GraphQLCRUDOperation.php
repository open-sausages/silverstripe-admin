<?php

namespace SilverStripe\Admin\GraphQL;

use GraphQL\Type\Definition\Type;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\GraphQL\Manager;
use Exception;
use BadMethodCallException;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\OperationScaffolder;
use InvalidArgumentException;

abstract class GraphQLCRUDOperation extends GraphQLQuery
{
    /**
     * @var string
     */
    protected $modelClass;

    /**
     * @var Manager
     */
    protected $manager;

    /**
     * @var string
     */
    protected $operationClass;

    /**
     * GraphQLReadQuery constructor.
     * @param string $operation
     * @param string $modelClass
     * @param Manager $manager
     */
    public function __construct($operation, $modelClass, Manager $manager)
    {
        $operationClass = OperationScaffolder::getClassFromIdentifier($operation);
        if (!$operationClass) {
            throw new InvalidArgumentException(sprintf('Invalid operation %s'));
        }
        $this->operationClass = $operationClass;
        $this->setModelClass($modelClass);
        $this->setManager($manager);

        parent::__construct();
    }

    /**
     * @return string
     */
    public function getModelClass()
    {
        return $this->modelClass;
    }

    /**
     * @param string $class
     * @return $this
     */
    public function setModelClass($class)
    {
        $this->modelClass = $class;

        return $this;
    }

    /**
     * @return Manager
     */
    public function getManager()
    {
        return $this->manager;
    }

    /**
     * @param Manager $manager
     * @return $this
     */
    public function setManager(Manager $manager)
    {
        $this->manager = $manager;

        return $this;
    }

    /**
     * @return string
     */
    public function getOperationName()
    {
        return ucfirst($this->getQueryName());
    }

    /**
     * @return GraphQLData
     * @throws BadMethodCallException
     * @throws Exception
     */
    public function getQueryData()
    {
        if ($this->queryName) {
            user_error('Cannot set query name for a scaffolded query. It gets overridden.', E_NOTICE);
        }
        $class = $this->getModelClass();
        /* @var OperationScaffolder $scaffolder */
        $scaffolder = Injector::inst()->createWithArgs($this->operationClass, [$class]);
        $name = $scaffolder->getName();
        $manager = $this->getManager();
        $operation = $this->isMutation() ? $manager->getMutation($name) : $manager->getQuery($name);
        if (!$operation) {
            throw new Exception(sprintf('Could not find operation %s for %s.', $name, $class));
        }
        if (is_callable($operation)) {
            $operation = call_user_func($operation);
        }

        $this->setArgs($this->normaliseArgs($operation['args']))
            ->setQueryName($name);

        return parent::getQueryData();
    }

    /**
     * @param array $args
     * @return array
     */
    protected function normaliseArgs(array $args)
    {
        $result = [];
        foreach ($args as $name => $config) {
            /* @var Type $type */
            $type = $config['type'];
            $result[$name] = $type->toString();
        }

        return $result;
    }

}