class CreateParseData < ActiveRecord::Migration
  def change
    create_table :parse_data do |t|
      t.string :title
      t.string :titleinpage
      t.string :position
      t.string :experience
      t.string :department
      t.string :degree
      t.string :formwork
      t.string :gender
      t.string :salary
      t.string :number
      t.string :description
      t.string :right
      t.string :condition
      t.string :cv
      t.string :deadline
      t.string :formsendcv
      t.string :namecontact
      t.string :emailcontact
      t.string :phonecontact
      t.string :addresscontact
      t.string :company
      t.string :addresscompany
      t.string :phonecompany
      t.string :descriptioncompany

      t.timestamps
    end
  end
end
