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
        $uploadedImage = $request->files->get('image');
        $uploadedVaccination = $request->files->get('vaccination');
        $uploadedInsurance = $request->files->get('insurance');
        $uploadedFicheSanitaire = $request->files->get('ficheSanitaire');
        // dd($uploadedImage);      
        $destination = $this->getParameter('kernel.project_dir').'/assets/images/uploads/participants_images';
        // dd($destination);
        // dd($uploadedImage->move($destination));
        // dd($uploadedImage->getClientOriginalName(), PATHINFO_FILENAME);

        //image
        $originalImageName = pathinfo($uploadedImage->getClientOriginalName(), PATHINFO_FILENAME);
    
        $newImageName = $originalImageName. '-' . uniqid().'.'.$uploadedImage->guessExtension();
        // dd($newImageName);
        $movedImage = $uploadedImage->move($destination, $newImageName);
        // dd($movedImage);

        // vaccination
        $originalVaccinationName = pathinfo($uploadedVaccination->getClientOriginalName(), PATHINFO_FILENAME);
        $newVaccinationName = $originalVaccinationName. '-' . uniqid().'.'.$uploadedVaccination->guessExtension();
        $movedVaccination = $uploadedVaccination->move($destination, $newVaccinationName);

        //insurance
        $originalInsuranceName = pathinfo($uploadedInsurance->getClientOriginalName(), PATHINFO_FILENAME);
        $newInsuranceName = $originalInsuranceName. '-' . uniqid().'.'.$uploadedInsurance->guessExtension();
        $movedInsurance = $uploadedInsurance->move($destination, $newInsuranceName);

        // fiche sanitaire
        $originalFicheSanitaireName = pathinfo($uploadedFicheSanitaire->getClientOriginalName(), PATHINFO_FILENAME);
        $newFicheSanitaireName = $originalFicheSanitaireName. '-' . uniqid().'.'.$uploadedFicheSanitaire->guessExtension();
        $movedFicheSanitaire = $uploadedFicheSanitaire->move($destination, $newFicheSanitaireName);
        //   dd($movedFile);

        //image
        $participant->setImage($newImageName);
        $participant->setImageFile($movedImage);

        //vaccination
        $participant->setVaccination($newVaccinationName);
        $participant->setVaccinationFile($movedVaccination);

        //vaccination
        $participant->setInsurance($newInsuranceName);
        $participant->setInsuranceFile($movedInsurance);

        //Fiche sanitaire
        $participant->setFicheSanitaire($newFicheSanitaireName);
        $participant->setFicheSanitaireFile($movedFicheSanitaire);

        return $participant;
       
    }

}