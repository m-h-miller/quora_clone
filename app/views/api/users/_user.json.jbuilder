json.extract!(
  user,
  :id, :user_name
)

json.image_url asset_path(user.avatar.url)

json.questions(
  user.questions
)

json.answers(
  user.answers
)
