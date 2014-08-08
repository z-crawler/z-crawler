class PageController < ApplicationController
  def index

  end

  def work
  end

  def about
  end

  def create
    page = Nokogiri::HTML(open("db/test/parse_config/#{params[:file_config][:file_name].original_filename}"))

    @title_controller = page.css('title')
    @title_in_controller = page.css('h1')
    @title_in_second_controller  =   page.css('h3')

    @content_controller = page.css('h2').to_a
    @content_controller.concat(page.css('td').select{ |element| element.children.length <= 2})
    @content_controller.concat(page.css('td').css('a').select{ |element| element.children.length <= 2})
    @content_controller.concat(page.css('ul').css('li').css('p').select{ |element| element.children.length <= 2})
    @content_controller.concat(page.css('strong'))
    @content_controller.concat(page.css('b'))
    @content_controller.concat(page.css('em'))
    @content_controller.concat(page.css('div').select{|element| element.children.length <= 1 })
    @content_controller.concat(page.css('div').select{|element| element.css('br').length >= 1 })

    @title = []
    @title_in = []
    @title_in_second = []
    @content = []

    @title_controller.each do |title|
      @title.push ({"text" => title.text, "path" => title.path.gsub('[','&#91').gsub(']', '&#93').gsub('/', '&#47')})
      # @title.push ({"text" => title.text, "path" => title.path})
    end

    @title_in_controller.each do |title|
       @title_in.push ({"text" => title.text, "path" => title.path.gsub('[','&#91').gsub(']', '&#93').gsub('/', '&#47')})
       # @title_in.push ({"text" => title.text, "path" => title.path})

    end

    @title_in_second_controller.each do |title|
     @title_in_second.push ({"text" => title.text, "path" => title.path.gsub('[','&#91').gsub(']', '&#93').gsub('/', '&#47')})
     # @title_in_second.push ({"text" => title.text, "path" => title.path})
    end

    @content_controller.each do |content|
      @content.push ({"text" => content.text, "path" => content.path.gsub('[','&#91').gsub(']', '&#93').gsub('/', '&#47')})
      # @content.push ({"text" => content.text, "path" => content.path})
    end

    render 'index'
  end

  def parse
    # initial data of crawler
    @save_data = DataCrawler.new

    # initial with default value
    @save_data.update_attributes(Hash[*@save_data.attributes.except('created_at','updated_at','id').map { |att| [att.first, "html/1234567890"] }.flatten])
    #chang field with pair key, value from index.html
    @save_data.site_id = params[:site_id]
    params.each do |key, value|
      key =  key.gsub('&#47', '/').gsub('&#93', ']').gsub('&#91','[')
      case value
      when "job_name"
        @save_data.job_name = key
      when "company_name"
        @save_data.company_name = key
      when "company_address"
        @save_data.company_address = key
      when "staff_type"
        @save_data.staff_type = key
      when "job_industry"
        @save_data.job_industry = key
      when "job_type"
        @save_data.job_type = key
      when "salary"
        @save_data.salary = key
      when "work_place"
        @save_data.work_place = key
      when "job_content"
        @save_data.job_content = key
      when "priority"
        @save_data.priority = key
      when "station"
        @save_data.station = key
      when "station_id"
        @save_data.station_id = key
      when "job_category_id"
        @save_data.job_category_id = key
      when "job_category"
        @save_data.job_category = key
      when "job_category_sub"
        @save_data.job_category_sub = key
      when "job_category_full"
        @save_data.job_category_full = key
      when "job_item_id"
        @save_data.job_item_id = key
      when "job_no"
        @save_data.job_no = key
      when "job_info_type"
        @save_data.job_info_type = key
      when "company_phoneno"
        @save_data.company_phoneno = key
      when "company_faxno"
        @save_data.company_faxno = key
      when "company_description"
        @save_data.company_description = key
      when "work_type"
        @save_data.work_type = key
      when "work_period"
        @save_data.work_period = key
      when "limit_age"
        @save_data.limit_age = key
      when "limit_age_reason"
        @save_data.limit_age_reason = key
      when "work_hour"
        @save_data.work_hour = key
      when "lunch_time"
        @save_data.lunch_time = key
      when "overtime"
        @save_data.overtime = key
      when "work_day_per_week"
        @save_data.work_day_per_week = key
      when "bonus"
        @save_data.bonus = key
      when "day_off"
        @save_data.day_off = key
      when "two_days_off_per_week"
        @save_data.two_days_off_per_week = key
      when "days_off_per_year"
        @save_data.days_off_per_year = key
      when "child_care_day_off"
        @save_data.child_care_day_off = key
      when "child_care_place"
        @save_data.child_care_place = key
      # when "work_place_change"
        # @save_data.work_place_change = key
      when "company_staff_no"
        @save_data.company_staff_no = key
      when "insurances"
        @save_data.insurances = key
      when "retirement"
        @save_data.retirement = key
      when "re_apply_job"
        @save_data.re_apply_job = key
      when "apply_living_place"
        @save_data.apply_living_place = key
      when "commute_by_car"
        @save_data.commute_by_car = key
      when "comute_support"
        @save_data.comute_support = key
      when "job_recruit_number"
        @save_data.job_recruit_number = key
      when "education_background"
        @save_data.education_background = key
      when "required_experience"
        @save_data.required_experience = key
      when "required_certificate"
        @save_data.required_certificate = key
      when "extra_info"
        @save_data.extra_info = key
      when "comments"
        @save_data.comments = key
      when "registered_date"
        @save_data.registered_date = key
      when "expiry_date"
        @save_data.expiry_date = key
      when "contact_place"
        @save_data.contact_place = key
      when "other_info"
        @save_data.other_info = key
      when "tencongty"
        @save_data.tencongty = key
      when "sdt"
        @save_data.sdt = key
      when "email"
        @save_data.email = key
      when "website"
        @save_data.website = key
      when "address"
        @save_data.address = key
      when "status"
        @save_data.status = key
      when "map_workplace"
        @save_data.map_workplace = key
      when "map_province"
        @save_data.map_province = key
      when "map_city"
        @save_data.map_city = key
      when "map_district"
        @save_data.map_district = key
      end
    end
    if @save_data.save then
      flash[:success] = "Parse data saved!"
    else
      flash[:error] = "Error!"
    end
    @return = "Config success, choose next parse structure to config!!!"
    render 'show'
  end

  def show
    render 'show'
  end

end
