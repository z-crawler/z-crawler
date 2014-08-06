# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140806034545) do

  create_table "data_crawlers", force: true do |t|
    t.string   "job_name"
    t.string   "company_name"
    t.string   "company_address"
    t.string   "staff_type"
    t.string   "job_industry"
    t.string   "job_type"
    t.string   "salary"
    t.string   "work_place"
    t.string   "job_content"
    t.string   "priority"
    t.string   "site_id"
    t.string   "station"
    t.string   "station_id"
    t.string   "job_category_id"
    t.string   "job_category"
    t.string   "job_category_sub"
    t.string   "job_category_full"
    t.string   "job_item_id"
    t.string   "job_no"
    t.string   "job_info_type"
    t.string   "company_phoneno"
    t.string   "company_faxno"
    t.string   "company_description"
    t.string   "work_type"
    t.string   "work_period"
    t.string   "limit_age"
    t.string   "limit_age_reason"
    t.string   "work_hour"
    t.string   "lunch_time"
    t.string   "overtime"
    t.string   "work_day_per_week"
    t.string   "bonus"
    t.string   "day_off"
    t.string   "two_days_off_per_week"
    t.string   "days_off_per_year"
    t.string   "child_care_day_off"
    t.string   "child_care_place"
    t.string   "work_place_change"
    t.string   "company_staff_no"
    t.string   "insurances"
    t.string   "retirement"
    t.string   "re_apply_job"
    t.string   "apply_living_place"
    t.string   "commute_by_car"
    t.string   "comute_support"
    t.string   "job_recruit_number"
    t.string   "education_background"
    t.string   "required_experience"
    t.string   "required_certificate"
    t.string   "extra_info"
    t.string   "comments"
    t.string   "registered_date"
    t.string   "expiry_date"
    t.string   "contact_place"
    t.string   "other_info"
    t.string   "crawling_time"
    t.string   "tencongty"
    t.string   "sdt"
    t.string   "email"
    t.string   "website"
    t.string   "address"
    t.string   "status"
    t.string   "map_workplace"
    t.string   "map_province"
    t.string   "map_city"
    t.string   "map_district"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "data_saves", force: true do |t|
    t.string   "url"
    t.string   "job_name"
    t.string   "company_name"
    t.string   "company_address"
    t.string   "staff_type"
    t.string   "job_industry"
    t.string   "job_type"
    t.string   "salary"
    t.string   "work_place"
    t.string   "job_content"
    t.string   "priority"
    t.string   "site_id"
    t.string   "station"
    t.string   "station_id"
    t.string   "job_category_id"
    t.string   "job_category"
    t.string   "job_category_sub"
    t.string   "job_category_full"
    t.string   "job_item_id"
    t.string   "job_no"
    t.string   "job_info_type"
    t.string   "company_phoneno"
    t.string   "company_faxno"
    t.string   "company_description"
    t.string   "work_type"
    t.string   "work_period"
    t.string   "limit_age"
    t.string   "limit_age_reason"
    t.string   "work_hour"
    t.string   "lunch_time"
    t.string   "overtime"
    t.string   "work_day_per_week"
    t.string   "bonus"
    t.string   "day_off"
    t.string   "two_days_off_per_week"
    t.string   "days_off_per_year"
    t.string   "child_care_day_off"
    t.string   "child_care_place"
    t.string   "work_place_change"
    t.string   "company_staff_no"
    t.string   "insurances"
    t.string   "retirement"
    t.string   "re_apply_job"
    t.string   "apply_living_place"
    t.string   "commute_by_car"
    t.string   "comute_support"
    t.string   "job_recruit_number"
    t.string   "education_background"
    t.string   "required_experience"
    t.string   "required_certificate"
    t.string   "extra_info"
    t.string   "comments"
    t.string   "registered_date"
    t.string   "expiry_date"
    t.string   "contact_place"
    t.string   "other_info"
    t.string   "crawling_time"
    t.string   "tencongty"
    t.string   "sdt"
    t.string   "email"
    t.string   "website"
    t.string   "address"
    t.string   "status"
    t.string   "map_workplace"
    t.string   "map_province"
    t.string   "map_city"
    t.string   "map_district"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "parse_data", force: true do |t|
    t.string   "title"
    t.string   "titleinpage"
    t.string   "position"
    t.string   "experience"
    t.string   "department"
    t.string   "degree"
    t.string   "formwork"
    t.string   "gender"
    t.string   "salary"
    t.string   "number"
    t.string   "description"
    t.string   "right"
    t.string   "condition"
    t.string   "cv"
    t.string   "deadline"
    t.string   "formsendcv"
    t.string   "namecontact"
    t.string   "emailcontact"
    t.string   "phonecontact"
    t.string   "addresscontact"
    t.string   "company"
    t.string   "addresscompany"
    t.string   "phonecompany"
    t.string   "descriptioncompany"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
