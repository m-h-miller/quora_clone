# This JSON view is rendered from associations;
# i.e. Question.author, Answer.author

json.extract!(
  user,
  :id, :user_name
)

json.image_url asset_path(user.avatar.url)

json.topics do
  json.array!(user.topics) do |topic|
    json.partial! 'api/topics/topic', topic: topic
  end
end
