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
    page = Nokogiri::HTML(open("index.html"))
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
  params.each do |key, value|
    puts "#{value}: #{key}"
  end
  puts "==============================//==================================="
    # @saveData = ParseData.new(parsedata_params)
    # if @saveData.save then
      # flash[:success] = "Parse data saved!"
      # puts "success"
    # else
      # flash[:succes] = "Error!"
      # puts "error"
    # end
    render 'parse'
  end

  private

  def parsedata_params
    params.permit(:title, :titleinpage, :position, :experience, :department, :degree, :formwork, :gender, :salary,
      :number, :description, :right, :condition, :cv, :deadline, :formsendcv, :namecontact, :emailcontact, :phonecontact,
      :addresscontact, :company, :addresscompany, :phonecompany, :descriptioncompany)
  end
end
