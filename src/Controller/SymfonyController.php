<?php

namespace App\Controller;

use App\Entity\Message;
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
        return $this->render('symfony/homepage.html.twig', [
            'controller_name' => 'SymfonyController',
        ]);
    }

    #[Route('/api/login', name: 'api_login')]
    public function login(): Response
    {
        return $this->render('symfony/login.html.twig', [
            'controller_name' => 'SymfonyController',
        ]);
    }

    #[Route('/signup', name: 'app_signup')]
    public function signup(): Response
    {
        return $this->render('symfony/signup.html.twig', [
            'controller_name' => 'SymfonyController',
        ]);
    }

    #[Route('/contact', name: 'app_contact')]
    public function contact(): Response
    {
        return $this->render('symfony/contact.html.twig', [
            'controller_name' => 'SymfonyController',
        ]);
    }
    #[Route('/about', name: 'app_about')]
    public function about(): Response
    {
        return $this->render('symfony/about.html.twig', [
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


        // $deleteUrl = $this->generateUrl('delete_comment', ['id' => $id], UrlGeneratorInterface::ABSOLUTE_URL);
        // $validationUrl = $this->generateUrl('validate_comment', ['id' => $id], UrlGeneratorInterface::ABSOLUTE_URL);
        

        $mail = (new Email())
                ->from($email)
                ->to('contact@animplus.org')
                ->subject('Vous avez un nouveau message!')
                ->text($text, 'text/html')
                ->html("<p>Vous avez un nouveau commentaire de $name ($email) sur le site de gaea21: </p><br> $text <br><br> Vous pouvez le  <button href=''> supprimer</button> ou <button href=''> valider</button>");

        $mailer->send($mail);

     
        $em->flush();



        // $this->addFlash(
        //     'comment', 'Votre message à été bien envoyé!'
        // );
        // return $this->redirect($this->generateUrl('app_newsletter').'#section-newsletter');
        return $this->redirectToRoute("app_contact"); // à modifier pour redirect à la même section de la page
    }


}
