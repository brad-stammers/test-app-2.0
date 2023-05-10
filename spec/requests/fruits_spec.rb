require 'rails_helper'

RSpec.describe "/fruits", type: :request do

  let(:valid_attributes) {
    FactoryBot.attributes_for(:fruit)
  }
  let(:invalid_attributes) {
    FactoryBot.attributes_for(:fruit_invalid)
  }
  let(:valid_headers) {
      {}
  }
  describe "GET /index" do
    # login_user
    it "renders a successful response" do
      fruit = FactoryBot.create :fruit
      get api_v1_fruits_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end
  describe "GET /show" do
    it "renders a successful response" do
      fruit = FactoryBot.create :fruit
      get api_v1_fruit_url(fruit), as: :json
      expect(response).to be_successful
    end
  end
  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Fruit" do
        expect {
          post api_v1_fruits_url, params: { fruit: valid_attributes }, as: :json
        }.to change(Fruit, :count).by(1)
      end
      it "renders a JSON response with the new fruit" do
        post api_v1_fruits_url,
             params: { fruit: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
    context "with invalid parameters" do
      it "does not create a new Fruit" do
        expect {
          post api_v1_fruits_url, params: { fruit: invalid_attributes }
        }.to change(Fruit, :count).by(0)
      end
      it "renders an unsuccessful response" do
        post api_v1_fruits_url, params: { fruit: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        { name: "Banana", desc: "Meh" }
      }
      it "updates the requested fruit" do
        fruit = FactoryBot.create :fruit
        patch api_v1_fruit_url(fruit), params: { fruit: new_attributes }, as: :json
        fruit.reload
        expect(fruit.name).to eq('Banana')
        expect(fruit.desc).to eq('Meh')
      end
    end
    context "with invalid parameters" do
      it "renders an unsuccessful response" do
        fruit = FactoryBot.create :fruit
        patch api_v1_fruit_url(fruit), params: { fruit: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
  describe "DELETE /destroy" do
    it "destroys the requested fruit" do
      fruit = FactoryBot.create :fruit
      expect {
        delete api_v1_fruit_url(fruit)
      }.to change(Fruit, :count).by(-1)
    end
  end

end
