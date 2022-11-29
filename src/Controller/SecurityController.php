<?php

namespace App\Controller;

use ApiPlatform\Core\Api\IriConverterInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route('/api/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils)
    {

        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

          // get the login error if there is one
          $error = $authenticationUtils->getLastAuthenticationError();
          // last username entered by the user
          $lastUsername = $authenticationUtils->getLastUsername();

          return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    #[Route('/api/logout', name: 'api_logout')]
    public function logout()
    {
        throw new \Exception('should not be reached');
    }
}
