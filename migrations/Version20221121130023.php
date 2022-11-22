<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221121130023 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE activity_working_days (activity_id INT NOT NULL, working_days_id INT NOT NULL, INDEX IDX_BC268CDD81C06096 (activity_id), INDEX IDX_BC268CDDEB0558D9 (working_days_id), PRIMARY KEY(activity_id, working_days_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE working_days (id INT AUTO_INCREMENT NOT NULL, day VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE activity_working_days ADD CONSTRAINT FK_BC268CDD81C06096 FOREIGN KEY (activity_id) REFERENCES activity (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE activity_working_days ADD CONSTRAINT FK_BC268CDDEB0558D9 FOREIGN KEY (working_days_id) REFERENCES working_days (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE activity_working_days DROP FOREIGN KEY FK_BC268CDD81C06096');
        $this->addSql('ALTER TABLE activity_working_days DROP FOREIGN KEY FK_BC268CDDEB0558D9');
        $this->addSql('DROP TABLE activity_working_days');
        $this->addSql('DROP TABLE working_days');
    }
}
