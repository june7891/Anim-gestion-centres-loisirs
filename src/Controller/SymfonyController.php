<?php

namespace App\Controller;

use App\Entity\Enterprise;
use App\Entity\Message;
use App\Entity\User;
use App\Repository\EnterpriseRepository;
use App\Repository\ParticipantRepository;
use App\Repository\UserRepository;
use App\Security\UserAuthenticator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;
use App\Form\AddAccountFormType;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;


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




    #[Route('/add-account', name: 'app_add_account')]
        public function addAccount(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, UserRepository $userRepository): Response
        {
            $user = new User();
            $loggedUser = $this->getUser();
            $enterprise = $loggedUser->getEnterprise();
            // dd($enterprise);
            $form = $this->createForm(AddAccountFormType::class, $user);
            $form->handleRequest($request);
    
            if ($form->isSubmitted() && $form->isValid()) {
                // encode the plain password
                $user->setPassword(
                $userPasswordHasher->hashPassword(
                        $user,
                        $form->get('password')->getData()
                    )
                );
                $user->setRoles(array('ROLE_USER'));
             
                $user->setEnterprise($enterprise);
             
    
                $entityManager->persist($user);
               
                $entityManager->flush();

              
                return $this->redirectToRoute("app_user_list"); 
            }
    
            return $this->render('symfony/add_account.html.twig', [
                'addAccountForm' => $form->createView(),
            ]);
        }
    

    #[Route('/user-account', name: 'app_user_account')]
    public function account(EnterpriseRepository $enterpriseRepository): Response
    {

        $enterprise = $this->getUser()->getEnterprise();
        // dd($enterprise);

        if(!empty($enterprise)) {
             $userEnterprise = $this->getUser()->getEnterprise()->getId();
            $enterprise = $enterpriseRepository->findOneById($userEnterprise)->getName();  
             return $this->render('symfony/user-account.html.twig', [
            'enterprise' => $enterprise,
        ]);
        }

        return $this->render('symfony/user-account.html.twig', [
            'enterprise' => null
        ]);
    
     
        // dd($enterpriseName);

       
    }


    #[Route('/users-list', name: 'app_user_list')]
    public function usersList(UserRepository $userRepository): Response
    {


        $enterprise = $this->getUser()->getEnterprise()->getId();

        $myUsers = $userRepository->findBy(array('enterprise' => $enterprise));

        // dd($myUsers);
  

        return $this->render('symfony/users_list.html.twig', [
            'users' => $myUsers,
        ]);
    }
    #[Route('/delete/users/{id}', name: 'app_delete_user')]
    public function deleteUser(UserRepository $userRepository, EntityManagerInterface $em, int $id): Response
    {

        $user = $userRepository->findOneById($id);
        $em->remove($user);
        $em->flush();

   
        return $this->redirectToRoute("app_user_list"); 
    }


    #[Route('/add-enterprise', name: 'app_add_enterprise', methods:['POST'])]
    public function addEnterprise(Request $request, EntityManagerInterface $em, SerializerInterface $serializer, EnterpriseRepository $enterpriseRepository): Response
    {
        $user = $this->getUser();
        // dd($user);
       $enterpriseName = trim($request->get('enterprise'));
           

        $newEnterprise = $enterpriseRepository->findOneBy(['name' => $enterpriseName]);

        // dd($newEnterprise);

        if($newEnterprise === null) {
            $newEnterprise = new Enterprise();
            $newEnterprise->setName($enterpriseName);
            $user->setEnterprise($newEnterprise);
        } else {

            $this->addFlash('error', 'La structure existe déjà!');
            return $this->redirectToRoute("app_user_account"); 

        }
       $em->persist($newEnterprise);
       $em->persist($user);
       $em->flush();
       $this->addFlash('notice', 'Le nom de la structure a été bien ajouté');
       return $this->redirectToRoute("app_user_account"); 
    
    }
    

  
    #[Route('/sendMessage', name: 'app_message')]
    public function sendMessage(Request $request, MailerInterface $mailer, EntityManagerInterface $em){


        $email = $request->get("email");
        $name = $request->get("name");
        $text = $request->get("message");
       
        if(!empty($email && $name && $text)) {
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

                $this->addFlash('notice', 'Votre message à été bien envoyé!');
                return $this->redirect($this->generateUrl('app_contact').'#section-contact');

        } else {
            
            $this->addFlash('error', 'Veuillez remplir tous les champs!');
            return $this->redirect($this->generateUrl('app_contact').'#section-contact');

        }
    }




    #[Route('/api/sendEmail', name: 'app_email')]
    public function sendEmail(Request $request, MailerInterface $mailer, SerializerInterface $serializer){

        $data = $request->getContent();
        if(isset($data)) {
        
        $emailData = json_decode($data, true);
        $emailOne = $emailData["emailOne"];
        $emailTwo = $emailData["emailTwo"];
        $text = $emailData["message"];

        
      
              $mail = (new Email())
                ->from('no_reply@animplus.com')
                ->to($emailOne, $emailTwo)
                ->subject('Vous avez un nouveau message!')
                ->text($text, 'text/html');

                $mailer->send($mail);

                return new Response('Message a été bien envoyé.', 200, array('Content-Type' => 'text/html'));
        } 
           
        return new Response('Message non envoyé.', 400, array('Content-Type' => 'text/html'));
        }


}
