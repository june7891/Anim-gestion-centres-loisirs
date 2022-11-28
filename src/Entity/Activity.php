<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ActivityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ActivityRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => ['read:Activity']],
    denormalizationContext:['groups' => ['write:Activity']],
    itemOperations: [
        'put',
        'delete',
        'get' => [
            'normalization_context' => ['groups' => ['read:Activity', 'read:Activity']]
        ]
        ]
)]
class Activity
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(['read:Participant', 'read:Activity', 'write:Activity'])]
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['read:Participant', 'read:Activity', 'write:Activity'])]
    private $name;

    /**
     * @ORM\Column(type="integer")
     */
    #[Groups(['read:Activity', 'write:Activity'])]
    private $capacity;

    /**
     * @ORM\ManyToMany(targetEntity=Participant::class, mappedBy="activities")
     */
    #[Groups(['read:Activity', 'write:Activity'])]
    private $participants;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['read:Activity', 'write:Activity'])]
    private $reference;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     */
    #[Groups(['read:Activity', 'write:Activity'])]
    private $startedAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     */
    #[Groups(['read:Activity', 'write:Activity'])]
    private $endedAt;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    #[Groups(['read:Activity', 'write:Activity'])]
    private $price;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    #[Groups(['read:Activity', 'write:Activity'])]
    private $startDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    #[Groups(['read:Activity', 'write:Activity'])]
    private $endDate;


 

    public function __construct()
    {
        $this->participants = new ArrayCollection();
   
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): self
    {
        $this->capacity = $capacity;

        return $this;
    }

    /**
     * @return Collection<int, Participant>
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(Participant $participant): self
    {
        if (!$this->participants->contains($participant)) {
            $this->participants[] = $participant;
            $participant->addActivity($this);
        }

        return $this;
    }

    public function removeParticipant(Participant $participant): self
    {
        if ($this->participants->removeElement($participant)) {
            $participant->removeActivity($this);
        }

        return $this;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(string $reference): self
    {
        $this->reference = $reference;

        return $this;
    }

    public function getStartedAt(): ?\DateTimeImmutable
    {
        return $this->startedAt;
    }

    public function setStartedAt(?\DateTimeImmutable $startedAt): self
    {
        $this->startedAt = $startedAt;

        return $this;
    }

    public function getEndedAt(): ?\DateTimeImmutable
    {
        return $this->endedAt;
    }

    public function setEndedAt(?\DateTimeImmutable $endedAt): self
    {
        $this->endedAt = $endedAt;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(?int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(?\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(?\DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }



  
}
