class ChangeTypeFormatContent < ActiveRecord::Migration
  def change
    change_column :data_saves, :job_content, :text
  end
end
