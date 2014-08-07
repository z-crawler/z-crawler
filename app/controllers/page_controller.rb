require 'rubygems'
require 'nokogiri'
require 'open-uri'
class PageController < ApplicationController
  def index

  end
  def work
  end

  def about
  end

  def create
    page = Nokogiri::HTML(open("http://hcm.vieclam.24h.com.vn/nhan-vien-kinh-doanh/dai-dien-kinh-doanh-c96p1id1557265.html"))
    @title = page.css('title')
    @title_in = page.css('h1')
    @title_in_second = page.css('h2')
    @content = page.css('div').css('table').css('tbody').css('tr').css('td')
    temp = []

    @content.each do |element|
      if element.children.length > 1
        temp << element
      end
    end


    temp.each do |element|
      if @content.include? element
        @content.delete(element)
      end
    end
    render 'index'
  end

  def parse
    # initial data of crawler
    @saveData = DataCrawler.new()
    #chang field with pair key, value from index.html
    params.each do |key, value|
      key =  key.gsub('&#47', '/').gsub('&#93', ']').gsub('&#91','[')
      case value
      when "job_name"
        @saveData.job_name = key
      when "company_name"
        @saveData.company_name = key
      when "company_address"
        @saveData.company_address = key
      when "staff_type"
        @saveData.staff_type = key
      when "job_industry"
        @saveData.job_industry = key
      when "job_type"
        @saveData.job_type = key
      when "salary"
        @saveData.salary = key
      when "work_place"
        @saveData.work_place = key
      when "job_content"
        @saveData.job_content = key
      when "priority"
        @saveData.priority = key
      when "site_id"
        @saveData.site_id = key
      when "station"
        @saveData.station = key
      when "station_id"
        @saveData.station_id = key
      when "job_category_id"
        @saveData.job_category_id = key
      when "job_category"
        @saveData.job_category = key
      when "job_category_sub"
        @saveData.job_category_sub = key
      when "job_category_full"
        @saveData.job_category_full = key
      when "job_item_id"
        @saveData.job_item_id = key
      when "job_no"
        @saveData.job_no = key
      when "job_info_type"
        @saveData.job_info_type = key
      when "company_phoneno"
        @saveData.company_phoneno = key
      when "company_faxno"
        @saveData.company_faxno = key
      when "company_description"
        @saveData.company_description = key
      when "work_type"
        @saveData.work_type = key
      when "work_period"
        @saveData.work_period = key
      when "limit_age"
        @saveData.limit_age = key
      when "limit_age_reason"
        @saveData.limit_age_reason = key
      when "work_hour"
        @saveData.work_hour = key
      when "lunch_time"
        @saveData.lunch_time = key
      when "overtime"
        @saveData.overtime = key
      when "work_day_per_week"
        @saveData.work_day_per_week = key
      when "bonus"
        @saveData.bonus = key
      when "day_off"
        @saveData.day_off = key
      when "two_days_off_per_week"
        @saveData.two_days_off_per_week = key
      when "days_off_per_year"
        @saveData.days_off_per_year = key
      when "child_care_day_off"
        @saveData.child_care_day_off = key
      when "child_care_place"
        @saveData.child_care_place = key
      when "work_place_change"
        @saveData.work_place_change = key
      when "company_staff_no"
        @saveData.company_staff_no = key
      when "insurances"
        @saveData.insurances = key
      when "retirement"
        @saveData.retirement = key
      when "re_apply_job"
        @saveData.re_apply_job = key
      when "apply_living_place"
        @saveData.apply_living_place = key
      when "commute_by_car"
        @saveData.commute_by_car = key
      when "comute_support"
        @saveData.comute_support = key
      when "job_recruit_number"
        @saveData.job_recruit_number = key
      when "education_background"
        @saveData.education_background = key
      when "required_experience"
        @saveData.required_experience = key
      when "required_certificate"
        @saveData.required_certificate = key
      when "extra_info"
        @saveData.extra_info = key
      when "comments"
        @saveData.comments = key
      when "registered_date"
        @saveData.registered_date = key
      when "expiry_date"
        @saveData.expiry_date = key
      when "contact_place"
        @saveData.contact_place = key
      when "other_info"
        @saveData.other_info = key
      when "tencongty"
        @saveData.tencongty = key
      when "sdt"
        @saveData.sdt = key
      when "email"
        @saveData.email = key
      when "website"
        @saveData.website = key
      when "address"
        @saveData.address = key
      when "status"
        @saveData.status = key
      when "map_workplace"
        @saveData.map_workplace = key
      when "map_province"
        @saveData.map_province = key
      when "map_city"
        @saveData.map_city = key
      when "map_district"
        @saveData.map_district = key
      end
    end

    if @saveData.save then
      # flash[:success] = "Parse data saved!"
      puts "success"
    else
      # flash[:succes] = "Error!"
      puts "error"
    end
    @return = "Yes"
    render 'parse'
  end
end
