<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
   
    #[Route('/homepage', name: 'app_homepage')]
    public function index(): Response
    {

        
        return $this->render('main/homepage.html.twig');
    }


    #[Route('/account/{id}', name: 'app_account_user')]
    public function account(): Response
    {

        
        return $this->render('main/account_page.html.twig');
    }
    #[Route('/addNewActivity', name: 'app_new-activity')]
    public function addActivity(): Response
    {

        
        return $this->render('main/activity_form.html.twig');
    }


}
