<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ActivityDayRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ActivityDayRepository::class)
 */
#[ApiResource]
class ActivityDay
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(['read:Participant', 'write:Participant', 'read:Activity', 'write:Activity'])]
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    #[Groups(['read:Participant', 'write:Participant', 'read:Activity', 'write:Activity'])]
    private $activityDate;

    /**
     * @ORM\ManyToMany(targetEntity=Activity::class, mappedBy="activityDay")
     */
    private $activities;

    /**
     * @ORM\ManyToMany(targetEntity=Participant::class, mappedBy="activityDay")
     */
    private $participants;

    public function __construct()
    {
        $this->activities = new ArrayCollection();
        $this->participants = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getActivityDate(): ?\DateTimeInterface
    {
        return $this->activityDate;
    }

    public function setActivityDate(\DateTimeInterface $activityDate): self
    {
        $this->activityDate = $activityDate;

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
            $activity->addActivityDay($this);
        }

        return $this;
    }

    public function removeActivity(Activity $activity): self
    {
        if ($this->activities->removeElement($activity)) {
            $activity->removeActivityDay($this);
        }

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
            $participant->addActivityDay($this);
        }

        return $this;
    }

    public function removeParticipant(Participant $participant): self
    {
        if ($this->participants->removeElement($participant)) {
            $participant->removeActivityDay($this);
        }

        return $this;
    }
}
