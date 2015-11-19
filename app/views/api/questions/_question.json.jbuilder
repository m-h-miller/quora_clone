json.extract!(
  question,
  :id, :title, :body
)

json.author(
  question.author
)

json.answers(
  question.answers
)

# json.answers do
#   json.array!(question.answers) do |answer|
#     json.partial! 'answers/answer', answer: answer
#   end
# end
#
# if show_toys
#   json.toys do
#     json.array!(pokemon.toys) do |toy|
#       json.partial! 'toys/toy', toy: toy
#     end
#   end
# end
