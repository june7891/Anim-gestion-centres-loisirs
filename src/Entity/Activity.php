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
#[ApiResource()]
class Activity
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(['read:Participant'])]
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['read:Participant', 'write:Participant'])]
    private $name;

    /**
     * @ORM\Column(type="integer")
     */
    #[Groups(['write:Participant'])]
    private $capacity;

    /**
     * @ORM\ManyToMany(targetEntity=Participant::class, mappedBy="activities")
     */
    private $participants;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $reference;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     */
    private $startedAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     */
    private $endedAt;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $price;

    /**
     * @ORM\ManyToMany(targetEntity=WorkingDays::class, inversedBy="activities")
     */
    private $workingDays;

    public function __construct()
    {
        $this->participants = new ArrayCollection();
        $this->workingDays = new ArrayCollection();
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

    /**
     * @return Collection<int, WorkingDays>
     */
    public function getWorkingDays(): Collection
    {
        return $this->workingDays;
    }

    public function addWorkingDay(WorkingDays $workingDay): self
    {
        if (!$this->workingDays->contains($workingDay)) {
            $this->workingDays[] = $workingDay;
        }

        return $this;
    }

    public function removeWorkingDay(WorkingDays $workingDay): self
    {
        $this->workingDays->removeElement($workingDay);

        return $this;
    }
}
