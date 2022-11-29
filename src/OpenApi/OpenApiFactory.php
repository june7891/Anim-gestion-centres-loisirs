<?php

namespace App\OpenApi;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\OpenApi;


class OpenApiFactory implements OpenApiFactoryInterface
{


    public function __construct(private OpenApiFactoryInterface $decorated ) {
        $this->decorated = $decorated;
    }

	public function __invoke(array $context = []): OpenApi 
    {
        $openApi = $this->decorated->__invoke($context);


        $schemas = $openApi->getComponents()->getSecuritySchemes();
        $schemas['cookieAuth'] = new \ArrayObject([
            'type' => 'apiKey',
            'in' => 'cookie',
            'name' => 'PHPSESSID'
        ]);

        // $openApi = $openApi->withSecurity(['cookieAuth' => []]);

        return $openApi;
	}

    
}