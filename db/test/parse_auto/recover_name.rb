list_dir = Dir.glob('*').select {|f| File.directory? f}
list_dir.each do |dir_site|
  Dir.glob("#{dir_site}/*.done") do |html_file|
    File.rename(html_file, html_file.gsub(".done", ".html"))
  end
end