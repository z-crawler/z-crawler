class CreateDataCrawlerStructures < ActiveRecord::Migration
  def change
    create_table :data_crawler_structures do |t|
      t.string :job_name
      t.string :company_name
      t.string :company_address
      t.string :staff_type
      t.string :job_industry
      t.string :job_type
      t.string :salary
      t.string :work_place
      t.string :job_content
      t.string :priority
      t.string :site_id
      t.string :station
      t.string :station_id
      t.string :job_category_id
      t.string :job_category
      t.string :job_category_sub
      t.string :job_category_full
      t.string :job_item_id
      t.string :job_no
      t.string :job_info_type
      t.string :company_phoneno
      t.string :company_faxno
      t.string :company_description
      t.string :work_type
      t.string :work_period
      t.string :limit_age
      t.string :limit_age_reason
      t.string :work_hour
      t.string :lunch_time
      t.string :overtime
      t.string :work_day_per_week
      t.string :bonus
      t.string :day_off
      t.string :two_days_off_per_week
      t.string :days_off_per_year
      t.string :child_care_day_off
      t.string :child_care_place
      t.string :work_place_change
      t.string :company_staff_no
      t.string :insurances
      t.string :retirement
      t.string :re_apply_job
      t.string :apply_living_place
      t.string :commute_by_car
      t.string :comute_support
      t.string :job_recruit_number
      t.string :education_background
      t.string :required_experience
      t.string :required_certificate
      t.string :extra_info
      t.string :comments
      t.string :registered_date
      t.string :expiry_date
      t.string :contact_place
      t.string :other_info
      t.string :crawling_time
      t.string :tencongty
      t.string :sdt
      t.string :email
      t.string :website
      t.string :address
      t.string :status
      t.string :map_workplace
      t.string :map_province
      t.string :map_city
      t.string :map_district

      t.timestamps
    end
  end
end
