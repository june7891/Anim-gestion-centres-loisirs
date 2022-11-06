<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use App\Repository\ParticipantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ParticipantRepository::class)
 *
 */
#[ApiResource(
    normalizationContext: ['groups' => ['read:collection']],
    denormalizationContext:['groups' => ['write:Participant']],
    paginationItemsPerPage: 2,
    itemOperations: [
        'put',
        'delete',
        'get' => [
            'normalization_context' => ['groups' => ['read:collection', 'read:item', 'read:Participant']]
        ]
        ])]
#[ApiFilter(SearchFilter::class, properties: ['firstname' => 'partial'])]
   
class Participant
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(['read:collection'])]
    #[ApiProperty(identifier: true)]
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['read:collection', 'write:Participant'])]
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['read:collection', 'write:Participant'])]
    private $lastname;

    /**
     * @ORM\Column(type="date")
     */
    #[Groups(['read:item', 'write:Participant'])]
    private $dateOfBirth;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['read:item','write:Participant'])]
    private $schoolLevel;

    /**
     * @ORM\ManyToMany(targetEntity=Activity::class, inversedBy="participants", cascade={"persist"})
     */
    #[Groups(['read:item', 'write:Participant'])]
    private $activities;

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

    public function getSchoolLevel(): ?string
    {
        return $this->schoolLevel;
    }

    public function setSchoolLevel(string $schoolLevel): self
    {
        $this->schoolLevel = $schoolLevel;

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
}
