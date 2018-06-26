<?php

namespace SilverStripe\Admin;

interface GridFieldProvider
{
    public function provideGridFields(GridFieldRegistry $registry);
}