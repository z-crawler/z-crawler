class DataController < ApplicationController
  def create
    list_dir = Dir.glob('db/test/parse_auto/*').select {|f| File.directory? f}
    list_dir.each do |dir_site|
      Dir.glob("#{dir_site}/*.html") do |html_file|
        # do work on files ending in .rb in the desired directory
        site_id = dir_site.gsub(/[^0-9]/, '')
        page = Nokogiri::HTML(open(html_file))
        parse = DataCrawler.find_by(site_id: site_id)
        @save_data = DataSave.new(
          url: "",
          job_name: page.xpath(parse.job_name).text,
          company_name: page.xpath(parse.company_name).text,
          company_address: page.xpath(parse.company_address).text,
          staff_type: page.xpath(parse.staff_type).text,
          job_industry: page.xpath(parse.job_industry).text,
          job_type: page.xpath(parse.job_type).text,
          salary: page.xpath(parse.salary).text,
          work_place: page.xpath(parse.work_place).text,
          job_content: page.xpath(parse.job_content).text,
          priority: page.xpath(parse.priority).text,
          station: page.xpath(parse.station).text,
          station_id: page.xpath(parse.station_id).text,
          job_category_id: page.xpath(parse.job_category_id).text,
          job_category: page.xpath(parse.job_category).text,
          job_category_sub: page.xpath(parse.job_category_sub).text,
          job_category_full: page.xpath(parse.job_category_full).text,
          job_item_id: page.xpath(parse.job_item_id).text,
          job_no: page.xpath(parse.job_no).text,
          job_info_type: page.xpath(parse.job_info_type).text,
          company_phoneno: page.xpath(parse.company_phoneno).text,
          company_faxno: page.xpath(parse.company_faxno).text,
          company_description: page.xpath(parse.company_description).text,
          work_type: page.xpath(parse.work_type).text,
          work_period: page.xpath(parse.work_period).text,
          limit_age: page.xpath(parse.limit_age).text,
          limit_age_reason: page.xpath(parse.limit_age_reason).text,
          work_hour: page.xpath(parse.work_hour).text,
          lunch_time: page.xpath(parse.lunch_time).text,
          overtime: page.xpath(parse.overtime).text,
          work_day_per_week: page.xpath(parse.work_day_per_week).text,
          bonus: page.xpath(parse.bonus).text,
          day_off: page.xpath(parse.day_off).text,
          two_days_off_per_week: page.xpath(parse.two_days_off_per_week).text,
          days_off_per_year: page.xpath(parse.days_off_per_year).text,
          child_care_day_off: page.xpath(parse.child_care_day_off).text,
          child_care_place: page.xpath(parse.child_care_place).text,
          # work_place_change: page.xpath(parse.work_place_change.gsub('/', '//')).text,
          company_staff_no: page.xpath(parse.company_staff_no).text,
          insurances: page.xpath(parse.insurances).text,
          retirement: page.xpath(parse.retirement).text,
          re_apply_job: page.xpath(parse.re_apply_job).text,
          apply_living_place: page.xpath(parse.apply_living_place).text,
          commute_by_car: page.xpath(parse.commute_by_car).text,
          comute_support: page.xpath(parse.comute_support).text,
          job_recruit_number: page.xpath(parse.job_recruit_number).text,
          education_background: page.xpath(parse.education_background).text,
          required_experience: page.xpath(parse.required_experience).text,
          required_certificate: page.xpath(parse.required_certificate).text,
          extra_info: page.xpath(parse.extra_info).text,
          comments: page.xpath(parse.comments).text,
          registered_date: page.xpath(parse.registered_date).text,
          expiry_date: page.xpath(parse.expiry_date).text,
          contact_place: page.xpath(parse.contact_place).text,
          other_info: page.xpath(parse.other_info).text,
          crawling_time: page.xpath(parse.crawling_time).text,
          tencongty: page.xpath(parse.tencongty).text,
          sdt: page.xpath(parse.sdt).text,
          email: page.xpath(parse.email).text,
          website: page.xpath(parse.website).text,
          address: page.xpath(parse.address).text,
          status: page.xpath(parse.status).text,
          map_workplace: page.xpath(parse.map_workplace).text,
          map_province: page.xpath(parse.map_province).text,
          map_city: page.xpath(parse.map_city).text,
          map_district: page.xpath(parse.map_district).text,
        )
        @save_data.save
      end
    end
    @result = "Auto parse success"
    render 'page/parse'
  end
end
