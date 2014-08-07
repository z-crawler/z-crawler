require 'rubygems'
require 'nokogiri'
require 'open-uri'
class DataController < ApplicationController
  def create
    # page = Nokogiri::HTML(open(params[:url]))
    page = Nokogiri::HTML(open("index1.html"))
    parse = DataCrawler.first
    # @saveData = DataSave.new(job_name: page.xpath(parse.job_name.gsub('/', '//')))
    # @result = page.xpath(parse.job_name.gsub('/', '//'))
    @result = parse.company_name.gsub('/', '//')
    @return = page.xpath("/html[1]/body/div[1]/div[2]/div[3]/div[2]/h2".gsub('/', '//')).text
    render 'page/parse'
  end
end
