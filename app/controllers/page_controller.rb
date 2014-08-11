class PageController < ApplicationController
  def index

  end

  def work
  end

  def about
  end

  def create
    if params[:file_config].nil?
      flash[:error] = "Choose file to config, not empty!!!"
      redirect_to root_path
    else
      page = Nokogiri::HTML(open("#{path_data_config()}#{params[:file_config][:file_name].original_filename}"))

      @title = page.css('title')
      @title_in = page.css('h1')
      @title_in_second = page.css('h3')

      @content = page.css('h2').to_a
      @content.concat(page.css('td').select{ |element| element.children.length <= 2})
      @content.concat(page.css('td').css('a').select{ |element| element.children.length <= 2})
      @content.concat(page.css('ul').css('li').css('p').select{ |element| element.children.length <= 2})
      @content.concat(page.css('strong'))
      @content.concat(page.css('b'))
      @content.concat(page.css('em'))
      @content.concat(page.css('div').select{|element| element.children.length <= 1 })
      @content.concat(page.css('div').select{|element| element.css('br').length >= 1 })

      render 'index'
    end
  end

  def parse
    if params[:data][:site_id].blank? then
      flash[:error] = "Site's ID not null. Parse structure not save!!!"
    else
      # initial data of crawler
      @data_crawler = DataCrawler.find_by(site_id: params[:data][:site_id])
      if @data_crawler.blank? then
        @data_crawler = DataCrawler.new(get_param_data)
      else
        # update datacrawler
        @data_crawler.update(get_param_data)
        # destroy data save
        @destroy_data_saves = DataSave.where(site_id: params[:data][:site_id])
        @destroy_data_saves.each do |destroy_data|
          destroy_data.destroy
        end
        # ready re-parse data if data crawler update
        Dir.glob("#{path_data_auto()}#{params[:data][:site_id]}/*.done") do |html_file|
          File.rename(html_file, html_file.gsub(".done", ".html"))
        end
      end
      if @data_crawler.save then
        flash[:success] = "Config success, choose next parse structure to config!!!"
      else
        flash[:error] = "Error!"
      end
    end
    redirect_to root_path
  end

  def show
    render 'show'
  end

end
