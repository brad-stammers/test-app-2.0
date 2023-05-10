require 'rails_helper'

RSpec.describe Fruit, type: :model do
  subject { build(:fruit) }

  describe 'validations' do
    it { should validate_presence_of(:name) } 
    it { should validate_presence_of(:desc) }
  end
end
