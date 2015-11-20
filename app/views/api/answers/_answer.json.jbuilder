json.extract!(
  answer,
  :id, :title, :body, :question_id, :author_id
)

json.author(
  answer.author
)
#
# if show_toys
#   json.toys do
#     json.array!(pokemon.toys) do |toy|
#       json.partial! 'toys/toy', toy: toy
#     end
#   end
# end
