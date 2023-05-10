class Api::V1::FruitsController < ApplicationController
  before_action :set_fruit, only: %i[ show edit update destroy ]

  # GET /fruits or /fruits.json
  def index
    if logged_in?
      @fruits = Fruit.all
      render json: @fruits
    end
  end
  # GET /fruits/1 or /fruits/1.json
  def show
    if logged_in?
      @fruit = Fruit.find_by(id: params[:id])
      render json: @fruit
    end
  end
  # GET /fruits/new
  def new
    if logged_in?
      @fruit = Fruit.new
      render json: @fruit
    end
  end
  # GET /fruits/1/edit
  def edit
    if logged_in?
      render json: @fruit
    end
  end
  # POST /fruits or /fruits.json
  def create
    if logged_in?
      @fruit = Fruit.new(fruit_params)
      if @fruit.save
        render json: @fruit, status: :created
      else
        render json: @fruit.errors, status: :unprocessable_entity
      end
    end
  end
  # PATCH/PUT /fruits/1 or /fruits/1.json
  def update
    if logged_in?
      if @fruit.update(fruit_params)
        render json: @fruit, status: :ok
      else
        render json: @fruit.errors, status: :unprocessable_entity
      end
    end
  end
  # DELETE /fruits/1 or /fruits/1.json
  def destroy
    if logged_in?
      @fruit.destroy
      head :no_content
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_fruit
      @fruit = Fruit.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def fruit_params
      params.require(:fruit).permit(:name, :desc)
    end
end
