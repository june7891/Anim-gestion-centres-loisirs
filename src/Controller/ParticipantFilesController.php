<?php

namespace App\Controller;

use App\Entity\Participant;
use Monolog\DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Yaml\Exception\RuntimeException;
use Symfony\Component\HttpFoundation\File\UploadedFile;


class ParticipantFilesController extends AbstractController
{
    public function __invoke(Request $request)
    {

        $participant = $request->attributes->get('data');
        // dd($request->files);
        if (!($participant instanceof Participant)) {
            throw new \RuntimeException('Participant attendu');
        }
        /**
         * @var UploadedFile $uploadedFile
         */
        $uploadedImage = $request->files->get('image');
        $uploadedVaccination = $request->files->get('vaccination');
        $uploadedInsurance = $request->files->get('insurance');
        $uploadedFicheSanitaire = $request->files->get('ficheSanitaire');

        $destination = $this->getParameter('kernel.project_dir') . '/public/images/uploads/participants_files';

        //image
        if(!empty($uploadedImage)) {
         $originalImageName = pathinfo($uploadedImage->getClientOriginalName(), PATHINFO_FILENAME);
         $newImageName = $originalImageName . '-' . uniqid() . '.' . $uploadedImage->guessExtension();
         $movedImage = $uploadedImage->move($destination, $newImageName);
         $participant->setImage($newImageName);
         $participant->setImageFile($movedImage);
        }
       
        // vaccination
        elseif(!empty($uploadedVaccination)) {
          $originalVaccinationName = pathinfo($uploadedVaccination->getClientOriginalName(), PATHINFO_FILENAME);
          $newVaccinationName = $originalVaccinationName . '-' . uniqid() . '.' . $uploadedVaccination->guessExtension();
          $movedVaccination = $uploadedVaccination->move($destination, $newVaccinationName); 
          $participant->setVaccination($newVaccinationName);
          $participant->setVaccinationFile($movedVaccination);
        }
        

        elseif(!empty($uploadedInsurance)) {
           //insurance
        $originalInsuranceName = pathinfo($uploadedInsurance->getClientOriginalName(), PATHINFO_FILENAME);
        $newInsuranceName = $originalInsuranceName . '-' . uniqid() . '.' . $uploadedInsurance->guessExtension();
        $movedInsurance = $uploadedInsurance->move($destination, $newInsuranceName);
        
         $participant->setInsurance($newInsuranceName);
         $participant->setInsuranceFile($movedInsurance);
        
        }
       
        elseif(!empty($uploadedFicheSanitaire)) {
        // fiche sanitaire
        $originalFicheSanitaireName = pathinfo($uploadedFicheSanitaire->getClientOriginalName(), PATHINFO_FILENAME);
        $newFicheSanitaireName = $originalFicheSanitaireName . '-' . uniqid() . '.' . $uploadedFicheSanitaire->guessExtension();
        $movedFicheSanitaire = $uploadedFicheSanitaire->move($destination, $newFicheSanitaireName);

         $participant->setFicheSanitaire($newFicheSanitaireName);
         $participant->setFicheSanitaireFile($movedFicheSanitaire);
        }

        else{
            echo 'erreur';
        }
     
        return $participant;
       
    }

}