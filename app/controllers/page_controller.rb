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
    require 'rubygems'
    require 'nokogiri'
    page = Nokogiri::HTML(open("index.html"))
    @title = page.css('title')
    puts @title
    puts "============================================="
    @title_in = page.css('h1')
    @title_in_second = page.css('h2')
    @content = page.css('div').css('table').css('tbody').css('tr').css('td')
    render 'index'
  end
end
