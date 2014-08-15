class ChangeTypeFormatInfo < ActiveRecord::Migration
  def change
    change_column :data_saves, :required_certificate, :text
    change_column :data_saves, :company_description, :text
    change_column :data_saves, :required_experience, :text
  end
end
