class AddAttachmentsFilesize < ActiveRecord::Migration
  def up
    add_column(:attachments, :filesize, :integer) unless column_exists?(:attachments, :filesize)
  end
  def down
    remove_column(:attachments, :filesize, :integer) if column_exists?(:attachments, :filesize)
  end
end
