require 'rubygems'
require 'nokogiri' 
require 'open-uri'
 class PageController < ApplicationController
 	@a
	def index
		
	end
    def work
    end
    def about
    end
	def create
		if params[:page][:url].empty?
          @a = nil
        else  
         page = Nokogiri::HTML(open(params[:page][:url]))   
         @a = page.css("td[class = br-L]")
         end
        render 'index'

	end
end
