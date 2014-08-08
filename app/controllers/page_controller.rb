class PageController < ApplicationController
  def index

  end

  def work
  end

  def about
  end

  def create
    page = Nokogiri::HTML(open("db/test/parse_config/#{params[:file_config][:file_name].original_filename}"))

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

  def parse
    # initial data of crawler
    @data_crawler = DataCrawler.new(get_param_data)
    if @data_crawler.save then
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
