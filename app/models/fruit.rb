class Fruit < ApplicationRecord
  validates :name, :desc, presence: true
end
