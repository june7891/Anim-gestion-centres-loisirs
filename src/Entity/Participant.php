<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use App\Controller\ParticipantImageController;
use App\Repository\ParticipantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
// use Vich\UploaderBundle\Entity\File;
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
            'normalization_context' => ['groups' => ['read:collection', 'read:item', 'read:Participant']]
        ],
        'image' => [
            'method' => 'POST',
            'path' => '/participants/{id}/image',
            'deserialize' => false,
            'controller' => ParticipantImageController::class
        ]
        ])
        ]
#[ApiFilter(SearchFilter::class, properties: ['firstname' => 'partial'])]
#[Vich\Uploadable]
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
     * @ORM\ManyToMany(targetEntity=Activity::class, inversedBy="participants", cascade={"persist"})
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
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $vaccination;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $insurance;

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
     * @ORM\OneToMany(targetEntity=EmergencyContact::class, mappedBy="participant")
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $emergencyContact;


    /**
     * @ORM\Column(type="string", length=255)
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
     * @ORM\Column(type="datetime")
     * @var \DateTimeImmutable
     */
    private $updatedAt;



   

    public function __construct()
    {
        $this->activities = new ArrayCollection();
        $this->emergencyContact = new ArrayCollection();
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

    public function getVaccination(): ?string
    {
        return $this->vaccination;
    }

    public function setVaccination(?string $vaccination): self
    {
        $this->vaccination = $vaccination;

        return $this;
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

    /**
     * @return Collection<int, EmergencyContact>
     */
    public function getEmergencyContact(): Collection
    {
        return $this->emergencyContact;
    }

    public function addEmergencyContact(EmergencyContact $emergencyContact): self
    {
        if (!$this->emergencyContact->contains($emergencyContact)) {
            $this->emergencyContact[] = $emergencyContact;
            $emergencyContact->setParticipant($this);
        }

        return $this;
    }

    public function removeEmergencyContact(EmergencyContact $emergencyContact): self
    {
        if ($this->emergencyContact->removeElement($emergencyContact)) {
            // set the owning side to null (unless already changed)
            if ($emergencyContact->getParticipant() === $this) {
                $emergencyContact->setParticipant(null);
            }
        }

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

  
}
