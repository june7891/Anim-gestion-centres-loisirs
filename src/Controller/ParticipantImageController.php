<?php

namespace App\Controller;

use App\Entity\Participant;
use Monolog\DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Yaml\Exception\RuntimeException;
use Symfony\Component\HttpFoundation\File\UploadedFile;


class ParticipantImageController extends AbstractController
{
    public function __invoke(Request $request) {
        
        $participant = $request->attributes->get('data');
        // dd($request->files);
        if(!($participant instanceof Participant)) {
            throw new \RuntimeException('Participant entendu');
        }
        /**
         * @var UploadedFile $uploadedFile
         */
        $uploadedFile = $request->files->get('image');
        // dd($uploadedFile);      
        $destination = $this->getParameter('kernel.project_dir').'/public/uploads/participants_images';
        // dd($uploadedFile->move($destination));
        $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
        $newFilename = $originalFilename. '-' . uniqid().'.'.$uploadedFile->guessExtension();
        $movedFile = $uploadedFile->move($destination, $newFilename);
        //   dd($movedFile);
        $participant->setImage($newFilename);
        $participant->setImageFile($movedFile);
        return $participant;
       
    }

}