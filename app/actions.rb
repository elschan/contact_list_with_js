# Homepage (Root path)
get '/' do
  erb :index
end

post '/add_user' do
  # binding.pry
  contact = User.create(name: params[:name], email: params[:email])
end

get '/find_user' do
  users = []
  if params[:query_name]
  User.where("name LIKE ?", "%#{params[:query_name]}%").each do |contact|
    users << contact
    end
  end
  if params[:query_email]
  User.where("email LIKE ?", "%#{params[:query_email]}%").each do|contact|
    users << contact
    end 
  end
  users.uniq.to_json
end  

delete '/delete_user' do
  user = User.find(params[:delete_id])
  user.delete
end

get '/list_users' do
  content_type 'json'
  User.all.to_json
end

post '/edit_user' do
  user = User.find(params[:editedUser])
  user.name = params[:newName]
  user.email = params[:newEmail]
  if user.save
    { :success => 'good' }.to_json
  end
end






