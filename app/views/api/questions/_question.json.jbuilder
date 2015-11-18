json.extract!(
  question,
  :title, :body, :author_id
)
#
# if show_toys
#   json.toys do
#     json.array!(pokemon.toys) do |toy|
#       json.partial! 'toys/toy', toy: toy
#     end
#   end
# end
