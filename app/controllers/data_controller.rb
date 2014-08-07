require 'rubygems'
require 'nokogiri'
require 'open-uri'
class DataController < ApplicationController
  def create
    Dir.glob('db/test/parse_auto/*.html') do |rb_file|
      # do work on files ending in .rb in the desired directory
      # page = Nokogiri::HTML(open(params[:url]))
      page = Nokogiri::HTML(open(rb_file))
      parse = DataCrawler.first
      puts parse.company_address
      puts parse.job_name
      @save_data = DataSave.new(
        url: "",
        job_name: page.xpath(parse.job_name.gsub('/', '//')).text,
        company_name: page.xpath(parse.company_name.gsub('/', '//')).text,
        company_address: page.xpath(parse.company_address.gsub('/', '//')).text,
        staff_type: page.xpath(parse.staff_type.gsub('/', '//')).text,
        job_industry: page.xpath(parse.job_industry.gsub('/', '//')).text,
        job_type: page.xpath(parse.job_type.gsub('/', '//')).text,
        salary: page.xpath(parse.salary.gsub('/', '//')).text,
        work_place: page.xpath(parse.work_place.gsub('/', '//')).text,
        job_content: page.xpath(parse.job_content.gsub('/', '//')).text,
        priority: page.xpath(parse.priority.gsub('/', '//')).text,
        station: page.xpath(parse.station.gsub('/', '//')).text,
        station_id: page.xpath(parse.station_id.gsub('/', '//')).text,
        job_category_id: page.xpath(parse.job_category_id.gsub('/', '//')).text,
        job_category: page.xpath(parse.job_category.gsub('/', '//')).text,
        job_category_sub: page.xpath(parse.job_category_sub.gsub('/', '//')).text,
        job_category_full: page.xpath(parse.job_category_full.gsub('/', '//')).text,
        job_item_id: page.xpath(parse.job_item_id.gsub('/', '//')).text,
        job_no: page.xpath(parse.job_no.gsub('/', '//')).text,
        job_info_type: page.xpath(parse.job_info_type.gsub('/', '//')).text,
        company_phoneno: page.xpath(parse.company_phoneno.gsub('/', '//')).text,
        company_faxno: page.xpath(parse.company_faxno.gsub('/', '//')).text,
        company_description: page.xpath(parse.company_description.gsub('/', '//')).text,
        work_type: page.xpath(parse.work_type.gsub('/', '//')).text,
        work_period: page.xpath(parse.work_period.gsub('/', '//')).text,
        limit_age: page.xpath(parse.limit_age.gsub('/', '//')).text,
        limit_age_reason: page.xpath(parse.limit_age_reason.gsub('/', '//')).text,
        work_hour: page.xpath(parse.work_hour.gsub('/', '//')).text,
        lunch_time: page.xpath(parse.lunch_time.gsub('/', '//')).text,
        overtime: page.xpath(parse.overtime.gsub('/', '//')).text,
        work_day_per_week: page.xpath(parse.work_day_per_week.gsub('/', '//')).text,
        bonus: page.xpath(parse.bonus.gsub('/', '//')).text,
        day_off: page.xpath(parse.day_off.gsub('/', '//')).text,
        two_days_off_per_week: page.xpath(parse.two_days_off_per_week.gsub('/', '//')).text,
        days_off_per_year: page.xpath(parse.days_off_per_year.gsub('/', '//')).text,
        child_care_day_off: page.xpath(parse.child_care_day_off.gsub('/', '//')).text,
        child_care_place: page.xpath(parse.child_care_place.gsub('/', '//')).text,
        # work_place_change: page.xpath(parse.work_place_change.gsub('/', '//')).text,
        company_staff_no: page.xpath(parse.company_staff_no.gsub('/', '//')).text,
        insurances: page.xpath(parse.insurances.gsub('/', '//')).text,
        retirement: page.xpath(parse.retirement.gsub('/', '//')).text,
        re_apply_job: page.xpath(parse.re_apply_job.gsub('/', '//')).text,
        apply_living_place: page.xpath(parse.apply_living_place.gsub('/', '//')).text,
        commute_by_car: page.xpath(parse.commute_by_car.gsub('/', '//')).text,
        comute_support: page.xpath(parse.comute_support.gsub('/', '//')).text,
        job_recruit_number: page.xpath(parse.job_recruit_number.gsub('/', '//')).text,
        education_background: page.xpath(parse.education_background.gsub('/', '//')).text,
        required_experience: page.xpath(parse.required_experience.gsub('/', '//')).text,
        required_certificate: page.xpath(parse.required_certificate.gsub('/', '//')).text,
        extra_info: page.xpath(parse.extra_info.gsub('/', '//')).text,
        comments: page.xpath(parse.comments.gsub('/', '//')).text,
        registered_date: page.xpath(parse.registered_date.gsub('/', '//')).text,
        expiry_date: page.xpath(parse.expiry_date.gsub('/', '//')).text,
        contact_place: page.xpath(parse.contact_place.gsub('/', '//')).text,
        other_info: page.xpath(parse.other_info.gsub('/', '//')).text,
        crawling_time: page.xpath(parse.crawling_time.gsub('/', '//')).text,
        tencongty: page.xpath(parse.tencongty.gsub('/', '//')).text,
        sdt: page.xpath(parse.sdt.gsub('/', '//')).text,
        email: page.xpath(parse.email.gsub('/', '//')).text,
        website: page.xpath(parse.website.gsub('/', '//')).text,
        address: page.xpath(parse.address.gsub('/', '//')).text,
        status: page.xpath(parse.status.gsub('/', '//')).text,
        map_workplace: page.xpath(parse.map_workplace.gsub('/', '//')).text,
        map_province: page.xpath(parse.map_province.gsub('/', '//')).text,
        map_city: page.xpath(parse.map_city.gsub('/', '//')).text,
        map_district: page.xpath(parse.map_district.gsub('/', '//')).text,
      )
      @save_data.save
    end
    @result = "success"
    render 'page/parse'
  end
end
