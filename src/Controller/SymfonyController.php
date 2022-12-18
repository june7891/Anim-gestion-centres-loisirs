<?php

namespace App\Controller;

use App\Entity\Message;
use App\Repository\ParticipantRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;


class SymfonyController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('symfony/homepage.html.twig');
    }

    #[Route('/api/login', name: 'api_login')]
    public function login(): Response
    {
        return $this->render('symfony/login.html.twig');
    }

    #[Route('/signup', name: 'app_signup')]
    public function signup(): Response
    {
        return $this->render('symfony/signup.html.twig');
    }

    #[Route('/contact', name: 'app_contact')]
    public function contact(): Response
    {
        return $this->render('symfony/contact.html.twig');
    }
    #[Route('/about', name: 'app_about')]
    public function about(): Response
    {
        return $this->render('symfony/about.html.twig');
    }


    #[Route('/user-account', name: 'app_user_account')]
    public function account(): Response
    {
        return $this->render('symfony/user-account.html.twig', [
            'controller_name' => 'SymfonyController',
        ]);
    }

  
    #[Route('/sendMessage', name: 'app_message')]
    public function sendMessage(Request $request, MailerInterface $mailer, EntityManagerInterface $em){

        $email = $request->get("email");
        $name = $request->get("name");
        $text = $request->get("message");
       

        $message = new Message();
        $message->setName($name);
        $message->setEmail($email);
        $message->setMessage($text);
        $em->persist($message);
       

        $mail = (new Email())
                ->from($email)
                ->to('contact@animplus.org')
                ->subject('Vous avez un nouveau message!')
                ->text($text, 'text/html')
                ->html("<p>Vous avez un nouveau message de $name ($email) sur le site de anim+: </p><br> $text");

        $mailer->send($mail);

     
        $em->flush();



        $this->addFlash(
            'comment', 'Votre message à été bien envoyé!'
        );
        return $this->redirectToRoute("app_contact"); 
    }
    #[Route('/api/sendEmail', name: 'app_email')]
    public function sendEmail(Request $request, MailerInterface $mailer){


        $data = $request->attributes->get('data');

        dd($data);

        $email = $request->attributes->get("email");
        $text = $request->attributes->get("message");

        // dd($email);
       
    
       

        $mail = (new Email())
                ->from('no_reply@animplus.com')
                ->to($email)
                ->subject('Vous avez un nouveau message!')
                ->text($text, 'text/html');

        $mailer->send($mail);

     




        // $this->addFlash(
        //     'comment', 'Votre message à été bien envoyé!'
        // );
        return $this->redirectToRoute("app_contact"); 
    }


}
