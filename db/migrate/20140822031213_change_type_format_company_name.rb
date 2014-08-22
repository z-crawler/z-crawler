class ChangeTypeFormatCompanyName < ActiveRecord::Migration
  def change
    change_column :data_saves, :company_name, :text
  end
end
