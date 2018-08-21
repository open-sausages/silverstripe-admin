<?php

namespace SilverStripe\Admin\GraphQL;

use SilverStripe\View\ArrayData;

class GraphQLData extends ArrayData
{
    /**
     * @var string
     */
    protected $template;

    /**
     * @param string $template
     * @return $this
     */
    public function setTemplate($template)
    {
        $this->template = $template;

        return $this;
    }

    /**
     * @return string
     */
    public function getTemplate()
    {
        return $this->template;
    }

    /**
     * @return string
     */
    public function toGraphQL()
    {
        return $this->renderWith($this->template)->RAW();
    }
}