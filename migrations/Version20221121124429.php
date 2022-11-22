<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221121124429 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE activity (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, capacity INT NOT NULL, reference VARCHAR(255) NOT NULL, started_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ended_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', price INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE emergency_contact (id INT AUTO_INCREMENT NOT NULL, participant_id INT DEFAULT NULL, first_name VARCHAR(255) DEFAULT NULL, last_name VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, INDEX IDX_FE1C61909D1C3019 (participant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE parent_one (id INT AUTO_INCREMENT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, address VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, postal_code VARCHAR(255) DEFAULT NULL, phone_number VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE parent_two (id INT AUTO_INCREMENT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, address VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, postal_code VARCHAR(255) DEFAULT NULL, phone_number VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE participant (id INT AUTO_INCREMENT NOT NULL, school_type_id INT DEFAULT NULL, parent_one_id INT DEFAULT NULL, parent_two_id INT DEFAULT NULL, school_level_id INT DEFAULT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, date_of_birth DATE NOT NULL, photo VARCHAR(255) DEFAULT NULL, gender VARCHAR(255) DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, postal_code VARCHAR(255) DEFAULT NULL, school_name VARCHAR(255) DEFAULT NULL, caf_number VARCHAR(255) DEFAULT NULL, fiche_sanitaire VARCHAR(255) DEFAULT NULL, vaccination VARCHAR(255) DEFAULT NULL, insurance VARCHAR(255) DEFAULT NULL, INDEX IDX_D79F6B115763BE0B (school_type_id), INDEX IDX_D79F6B11B4890DD5 (parent_one_id), INDEX IDX_D79F6B11DFD5EA1A (parent_two_id), INDEX IDX_D79F6B11A1F77FE3 (school_level_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE participant_activity (participant_id INT NOT NULL, activity_id INT NOT NULL, INDEX IDX_A2358CA79D1C3019 (participant_id), INDEX IDX_A2358CA781C06096 (activity_id), PRIMARY KEY(participant_id, activity_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE school_level (id INT AUTO_INCREMENT NOT NULL, level VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE school_type (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE emergency_contact ADD CONSTRAINT FK_FE1C61909D1C3019 FOREIGN KEY (participant_id) REFERENCES participant (id)');
        $this->addSql('ALTER TABLE participant ADD CONSTRAINT FK_D79F6B115763BE0B FOREIGN KEY (school_type_id) REFERENCES school_type (id)');
        $this->addSql('ALTER TABLE participant ADD CONSTRAINT FK_D79F6B11B4890DD5 FOREIGN KEY (parent_one_id) REFERENCES parent_one (id)');
        $this->addSql('ALTER TABLE participant ADD CONSTRAINT FK_D79F6B11DFD5EA1A FOREIGN KEY (parent_two_id) REFERENCES parent_two (id)');
        $this->addSql('ALTER TABLE participant ADD CONSTRAINT FK_D79F6B11A1F77FE3 FOREIGN KEY (school_level_id) REFERENCES school_level (id)');
        $this->addSql('ALTER TABLE participant_activity ADD CONSTRAINT FK_A2358CA79D1C3019 FOREIGN KEY (participant_id) REFERENCES participant (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE participant_activity ADD CONSTRAINT FK_A2358CA781C06096 FOREIGN KEY (activity_id) REFERENCES activity (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE emergency_contact DROP FOREIGN KEY FK_FE1C61909D1C3019');
        $this->addSql('ALTER TABLE participant DROP FOREIGN KEY FK_D79F6B115763BE0B');
        $this->addSql('ALTER TABLE participant DROP FOREIGN KEY FK_D79F6B11B4890DD5');
        $this->addSql('ALTER TABLE participant DROP FOREIGN KEY FK_D79F6B11DFD5EA1A');
        $this->addSql('ALTER TABLE participant DROP FOREIGN KEY FK_D79F6B11A1F77FE3');
        $this->addSql('ALTER TABLE participant_activity DROP FOREIGN KEY FK_A2358CA79D1C3019');
        $this->addSql('ALTER TABLE participant_activity DROP FOREIGN KEY FK_A2358CA781C06096');
        $this->addSql('DROP TABLE activity');
        $this->addSql('DROP TABLE emergency_contact');
        $this->addSql('DROP TABLE parent_one');
        $this->addSql('DROP TABLE parent_two');
        $this->addSql('DROP TABLE participant');
        $this->addSql('DROP TABLE participant_activity');
        $this->addSql('DROP TABLE school_level');
        $this->addSql('DROP TABLE school_type');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
