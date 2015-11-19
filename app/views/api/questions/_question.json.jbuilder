json.extract!(
  question,
  :id, :title, :body
)

json.author(
  question.author
)
#
# if show_toys
#   json.toys do
#     json.array!(pokemon.toys) do |toy|
#       json.partial! 'toys/toy', toy: toy
#     end
#   end
# end
