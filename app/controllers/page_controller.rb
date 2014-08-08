class PageController < ApplicationController
  def index

  end
  def work
  end

  def about
  end

  def create
    page = Nokogiri::HTML(open("db/test/parse_config/index.html"))
    @title_controller = page.css('title')
    @title_in_controller = page.css('h1')
    @title_in_second_controller = page.css('h2')
    @content_controller = page.css('div').css('table').css('tbody').css('tr').css('td')

    temp = []

    @content_controller.each do |element|
      temp << element if element.children.length > 1
    end

    temp.each do |element|
      @content_controller.delete(element) if @content_controller.include? element
    end

    @title = []
    @title_in = []
    @title_in_second = []
    @content = []

    @title_controller.each do |title|
      # @title.push ({"text" => title.text, "path" => title.path.gsub('[','&#91').gsub(']', '&#93').gsub('/', '&#47')})
      @title.push ({"text" => title.text, "path" => URI.encode(title.path)})#.gsub('[','&#91').gsub(']', '&#93').gsub('/', '&#47')})
    end

    @title_in_controller.each do |title|
      # @title_in.push ({"text" => title.text, "path" => title.path.gsub('[','&#91').gsub(']', '&#93').gsub('/', '&#47')})
      @title_in.push ({"text" => title.text, "path" => URI.encode(title.path)})#.gsub('[','&#91').gsub(']', '&#93').gsub('/', '&#47')})

    end

    @title_in_second_controller.each do |title|
      # @title_in_second.push ({"text" => title.text, "path" => title.path.gsub('[','&#91').gsub(']', '&#93').gsub('/', '&#47')})
      @title_in_second.push ({"text" => title.text, "path" => URI.encode(title.path)})#.gsub('[','&#91').gsub(']', '&#93').gsub('/', '&#47')})
    end

    @content_controller.each do |content|
      # @content.push ({"text" => content.text, "path" => content.path.gsub('[','&#91').gsub(']', '&#93').gsub('/', '&#47')})
      @content.push ({"text" => content.text, "path" => URI.encode(content.path)})#.gsub('[','&#91').gsub(']', '&#93').gsub('/', '&#47')})
    end

    render 'index'
  end

  def parse
    # initial data of crawler
    @data_crawler = DataCrawler.new(get_param_data)
    if @data_crawler.save then
      flash[:success] = "Parse data saved!"
      # puts "success"
    else
      flash[:error] = "Error!"
      # puts "error"
    end
    @return = "Yes"
    render 'parse'
  end

end
