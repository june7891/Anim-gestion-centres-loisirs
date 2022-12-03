<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221201094215 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE activity_activity_day (activity_id INT NOT NULL, activity_day_id INT NOT NULL, INDEX IDX_9E21755381C06096 (activity_id), INDEX IDX_9E2175535BB4A126 (activity_day_id), PRIMARY KEY(activity_id, activity_day_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE activity_day (id INT AUTO_INCREMENT NOT NULL, activity_date DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE participant_activity_day (participant_id INT NOT NULL, activity_day_id INT NOT NULL, INDEX IDX_AB1F3409D1C3019 (participant_id), INDEX IDX_AB1F3405BB4A126 (activity_day_id), PRIMARY KEY(participant_id, activity_day_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE activity_activity_day ADD CONSTRAINT FK_9E21755381C06096 FOREIGN KEY (activity_id) REFERENCES activity (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE activity_activity_day ADD CONSTRAINT FK_9E2175535BB4A126 FOREIGN KEY (activity_day_id) REFERENCES activity_day (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE participant_activity_day ADD CONSTRAINT FK_AB1F3409D1C3019 FOREIGN KEY (participant_id) REFERENCES participant (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE participant_activity_day ADD CONSTRAINT FK_AB1F3405BB4A126 FOREIGN KEY (activity_day_id) REFERENCES activity_day (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE activity_activity_day DROP FOREIGN KEY FK_9E21755381C06096');
        $this->addSql('ALTER TABLE activity_activity_day DROP FOREIGN KEY FK_9E2175535BB4A126');
        $this->addSql('ALTER TABLE participant_activity_day DROP FOREIGN KEY FK_AB1F3409D1C3019');
        $this->addSql('ALTER TABLE participant_activity_day DROP FOREIGN KEY FK_AB1F3405BB4A126');
        $this->addSql('DROP TABLE activity_activity_day');
        $this->addSql('DROP TABLE activity_day');
        $this->addSql('DROP TABLE participant_activity_day');
    }
}
