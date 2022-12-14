<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use App\Controller\ParticipantFilesController;
use App\Repository\ParticipantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;



/**
 * @ORM\Entity(repositoryClass=ParticipantRepository::class)
 */

#[ApiResource(
    normalizationContext: ['groups' => ['read:Participant']],
    denormalizationContext:['groups' => ['write:Participant']],
    itemOperations: [
        'put',
        'delete',
        'get' => [
            'normalization_context' => ['groups' => ['read:Participant']]
        ],
        'files' => [
            'method' => 'POST',
            'path' => '/participants/{id}/files',
            'deserialize' => false,
            'controller' => ParticipantFilesController::class
        ]
        ])
        ]
#[ApiFilter(SearchFilter::class, properties: ['enterprise' =>'exact', 'schoolLevel.level' => 'exact', 'schoolType.type' => 'exact'] )]

class Participant
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(['read:Participant', 'read:Activity'])]
    #[ApiProperty(identifier: true)]
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['read:Participant', 'write:Participant', 'read:Activity',])]
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['read:Participant', 'write:Participant', 'read:Activity',])]
    private $lastname;

    /**
     * @ORM\Column(type="date")
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $dateOfBirth;



    /**
     * @ORM\ManyToMany(targetEntity=Activity::class, inversedBy="participants", cascade={"persist", "remove"})
     */
    #[Groups(['read:item', 'write:Participant'])]
    private $activities;

    

   
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $gender;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $address;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $postalCode;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $schoolName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $cafNumber;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $ficheSanitaire;

        /**
     * 
     * @var UploadedFile $ficheSanitaireFile
     */
    #[Vich\UploadableField(mapping: 'participant_ficheSanitaire', fileNameProperty: 'ficheSanitaire')]
    private $ficheSanitaireFile;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $vaccination;

    
      /**
     * 
     * @var UploadedFile $vaccinationFile
     */
    #[Vich\UploadableField(mapping: 'participant_vaccination', fileNameProperty: 'vaccination')]
    private $vaccinationFile;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $insurance;

        /**
     * 
     * @var UploadedFile $insuranceFile
     */
    #[Vich\UploadableField(mapping: 'participant_insurance', fileNameProperty: 'insurance')]
    private $insuranceFile;

    /**
     * @ORM\ManyToOne(targetEntity=SchoolType::class, inversedBy="participants", cascade={"persist"})
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $schoolType;

    /**
     * @ORM\ManyToOne(targetEntity=ParentOne::class, inversedBy="participants", cascade={"persist", "remove"})
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $ParentOne;

    /**
     * @ORM\ManyToOne(targetEntity=ParentTwo::class, inversedBy="participants", cascade={"persist", "remove"})
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $ParentTwo;

    /**
     * @ORM\ManyToOne(targetEntity=SchoolLevel::class, inversedBy="participants", cascade={"persist"})
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $schoolLevel;


    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @var string
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $image;

      /**
     * 
     * @var UploadedFile $imageFile
     */
    #[Vich\UploadableField(mapping: 'participant_image', fileNameProperty: 'image')]
    private $imageFile;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @var \DateTimeImmutable
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Enterprise::class, inversedBy="participants")
     * @ORM\JoinColumn(nullable=false)
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $enterprise;


   

   

    public function __construct()
    {
        $this->activities = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getDateOfBirth(): ?\DateTimeInterface
    {
        return $this->dateOfBirth;
    }

    public function setDateOfBirth(\DateTimeInterface $dateOfBirth): self
    {
        $this->dateOfBirth = $dateOfBirth;

        return $this;
    }



    /**
     * @return Collection<int, Activity>
     */
    public function getActivities(): Collection
    {
        return $this->activities;
    }

    public function addActivity(Activity $activity): self
    {
        if (!$this->activities->contains($activity)) {
            $this->activities[] = $activity;
        }

        return $this;
    }

    public function removeActivity(Activity $activity): self
    {
        $this->activities->removeElement($activity);

        return $this;
    }



    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(?string $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(?string $postalCode): self
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getSchoolName(): ?string
    {
        return $this->schoolName;
    }

    public function setSchoolName(?string $schoolName): self
    {
        $this->schoolName = $schoolName;

        return $this;
    }

    public function getCafNumber(): ?string
    {
        return $this->cafNumber;
    }

    public function setCafNumber(?string $cafNumber): self
    {
        $this->cafNumber = $cafNumber;

        return $this;
    }

    public function getFicheSanitaire(): ?string
    {
        return $this->ficheSanitaire;
    }

    public function setFicheSanitaire(?string $ficheSanitaire): self
    {
        $this->ficheSanitaire = $ficheSanitaire;

        return $this;
    }


    public function setFicheSanitaireFile(File $ficheSanitaire = null)
    {
        $this->ficheSanitaireFile = $ficheSanitaire;

        // VERY IMPORTANT:
        // It is required that at least one field changes if you are using Doctrine,
        // otherwise the event listeners won't be called and the file is lost
        if ($ficheSanitaire) {
            // if 'updatedAt' is not defined in your entity, use another property
            $this->updatedAt = new \DateTimeImmutable('now');
        }
    }

    public function getFicheSanitaireFile()
    {
        return $this->ficheSanitaireFile;
    }


    public function getVaccination(): ?string
    {
        return $this->vaccination;
    }

    public function setVaccination(?string $vaccination): self
    {
        $this->vaccination = $vaccination;

        return $this;
    }


    public function setVaccinationFile(File $vaccination = null)
    {
        $this->vaccinationFile = $vaccination;

        // VERY IMPORTANT:
        // It is required that at least one field changes if you are using Doctrine,
        // otherwise the event listeners won't be called and the file is lost
        if ($vaccination) {
            // if 'updatedAt' is not defined in your entity, use another property
            $this->updatedAt = new \DateTimeImmutable('now');
        }
    }

    public function getVaccinationFile()
    {
        return $this->vaccinationFile;
    }

    public function getInsurance(): ?string
    {
        return $this->insurance;
    }

    public function setInsurance(?string $insurance): self
    {
        $this->insurance = $insurance;

        return $this;
    }

    public function setInsuranceFile(File $insurance = null)
    {
        $this->insuranceFile = $insurance;

        // VERY IMPORTANT:
        // It is required that at least one field changes if you are using Doctrine,
        // otherwise the event listeners won't be called and the file is lost
        if ($insurance) {
            // if 'updatedAt' is not defined in your entity, use another property
            $this->updatedAt = new \DateTimeImmutable('now');
        }
    }

    public function getInsuranceFile()
    {
        return $this->insuranceFile;
    }

    public function getSchoolType(): ?SchoolType
    {
        return $this->schoolType;
    }

    public function setSchoolType(?SchoolType $schoolType): self
    {
        $this->schoolType = $schoolType;

        return $this;
    }



  
    public function getParentOne(): ?ParentOne
    {
        return $this->ParentOne;
    }

    public function setParentOne(?ParentOne $ParentOne): self
    {
        $this->ParentOne = $ParentOne;
        return $this;
    }

    public function getParentTwo(): ?ParentTwo
    {
        return $this->ParentTwo;
    }

    public function setParentTwo(?ParentTwo $ParentTwo): self
    {
        $this->ParentTwo = $ParentTwo;

        return $this;
    }

    public function getSchoolLevel(): ?SchoolLevel
    {
        return $this->schoolLevel;
    }

    public function setSchoolLevel(?SchoolLevel $schoolLevel): self
    {
        $this->schoolLevel = $schoolLevel;

        return $this;
    }






    public function setImageFile(File $image = null)
    {
        $this->imageFile = $image;

        // VERY IMPORTANT:
        // It is required that at least one field changes if you are using Doctrine,
        // otherwise the event listeners won't be called and the file is lost
        if ($image) {
            // if 'updatedAt' is not defined in your entity, use another property
            $this->updatedAt = new \DateTimeImmutable('now');
        }
    }

    public function getImageFile()
    {
        return $this->imageFile;
    }

    public function setImage($image)
    {
        $this->image = $image;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function getEnterprise(): ?Enterprise
    {
        return $this->enterprise;
    }

    public function setEnterprise(?Enterprise $enterprise): self
    {
        $this->enterprise = $enterprise;

        return $this;
    }




  
}
