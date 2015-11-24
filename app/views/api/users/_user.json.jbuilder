json.extract!(
  user,
  :id, :user_name
)

json.questions(
  user.questions
)

json.answers(
  user.answers
)
