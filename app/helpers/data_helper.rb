module DataHelper

  def create_data_crawler input
    @output = []
    input.each do |input_in|

      path_structure = ""
      current_node = input_in
      until current_node.name == "html"
        temp = current_node

        check_null = temp.previous_element
        until check_null.nil?
          temp = check_null
          check_null = check_null.previous_element
        end

        index = 0
        until temp.nil?
          index += 1 if temp.name == current_node.name
          temp = temp.next_element
        end
        path_structure = "/" + current_node.name + '(' + index.to_s + ')' + "#{path_structure}"
        current_node = current_node.parent
      end
      path_structure = "/html(1)#{path_structure}"

      @output.push({"path" => input_in.path, "text" => input_in.text.gsub('\n','').gsub('\t','').strip, "path_structure" => path_structure})
    end
    @output
  end

  def path_data_config
    "db/test/parse_config/"
  end

  def path_data_auto
    "db/test/parse_auto/"
  end

  def map_data_columns
    data_crawler_columns = DataCrawler.columns.map{|c| c.name}
    data_crawler_columns.delete("id").delete("created_at").delete("updated_at")
    return data_crawler_columns
  end

  def get_param_data_crawler
    params.require("data").permit("job_name", "company_name", "company_address", "staff_type", "job_industry", "job_type", "salary", "work_place", "job_content", "priority", "site_id", "station", "station_id", "job_category_id", "job_category", "job_category_sub", "job_category_full", "job_item_id", "job_no", "job_info_type", "company_phoneno", "company_faxno", "company_description", "work_type", "work_period", "limit_age", "limit_age_reason", "work_hour", "lunch_time", "overtime", "work_day_per_week", "bonus", "day_off", "two_days_off_per_week", "days_off_per_year", "child_care_day_off", "child_care_place", "work_place_change", "company_staff_no", "insurances", "retirement", "re_apply_job", "apply_living_place", "commute_by_car", "comute_support", "job_recruit_number", "education_background", "required_experience", "required_certificate", "extra_info", "comments", "registered_date", "expiry_date", "contact_place", "other_info", "crawling_time", "tencongty", "sdt", "email", "website", "address", "status", "map_workplace", "map_province", "map_city", "map_district")
  end

  def get_param_data_crawer_structure
    params.require("structure").permit("job_name", "company_name", "company_address", "staff_type", "job_industry", "job_type", "salary", "work_place", "job_content", "priority", "site_id", "station", "station_id", "job_category_id", "job_category", "job_category_sub", "job_category_full", "job_item_id", "job_no", "job_info_type", "company_phoneno", "company_faxno", "company_description", "work_type", "work_period", "limit_age", "limit_age_reason", "work_hour", "lunch_time", "overtime", "work_day_per_week", "bonus", "day_off", "two_days_off_per_week", "days_off_per_year", "child_care_day_off", "child_care_place", "work_place_change", "company_staff_no", "insurances", "retirement", "re_apply_job", "apply_living_place", "commute_by_car", "comute_support", "job_recruit_number", "education_background", "required_experience", "required_certificate", "extra_info", "comments", "registered_date", "expiry_date", "contact_place", "other_info", "crawling_time", "tencongty", "sdt", "email", "website", "address", "status", "map_workplace", "map_province", "map_city", "map_district")
  end
end
