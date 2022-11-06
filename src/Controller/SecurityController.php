<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\Routing\Annotation\Route;



class SecurityController extends AbstractController
{
    #[Route(path:'/api/login', name: 'api_login', methods: ['post'])]
    public function login() {

        $user = $this->getUser();

    
        
        return $this->json([
            'username' => $user->getUsername(),
            'roles' => $user->getRoles()

        ]);
    }
    
}
