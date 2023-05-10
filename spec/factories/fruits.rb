FactoryBot.define do
  factory :fruit do
    name { "MyString" }
    desc { "MyString" }
  end

  factory :fruit_invalid, class: Fruit do
    name { "" }
    desc { "" }
  end
end
