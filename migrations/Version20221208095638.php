<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221208095638 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE activity ADD CONSTRAINT FK_AC74095AA97D1AC3 FOREIGN KEY (enterprise_id) REFERENCES enterprise (id)');
        $this->addSql('CREATE INDEX IDX_AC74095AA97D1AC3 ON activity (enterprise_id)');
        $this->addSql('ALTER TABLE participant DROP FOREIGN KEY FK_D79F6B11A76ED395');
        $this->addSql('DROP INDEX IDX_D79F6B11A76ED395 ON participant');
        $this->addSql('ALTER TABLE participant ADD enterprise_id INT NOT NULL, DROP user_id');
        $this->addSql('ALTER TABLE participant ADD CONSTRAINT FK_D79F6B11A97D1AC3 FOREIGN KEY (enterprise_id) REFERENCES enterprise (id)');
        $this->addSql('CREATE INDEX IDX_D79F6B11A97D1AC3 ON participant (enterprise_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE activity DROP FOREIGN KEY FK_AC74095AA97D1AC3');
        $this->addSql('DROP INDEX IDX_AC74095AA97D1AC3 ON activity');
        $this->addSql('ALTER TABLE participant DROP FOREIGN KEY FK_D79F6B11A97D1AC3');
        $this->addSql('DROP INDEX IDX_D79F6B11A97D1AC3 ON participant');
        $this->addSql('ALTER TABLE participant ADD user_id INT DEFAULT NULL, DROP enterprise_id');
        $this->addSql('ALTER TABLE participant ADD CONSTRAINT FK_D79F6B11A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_D79F6B11A76ED395 ON participant (user_id)');
    }
}
