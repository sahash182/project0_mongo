// CLIENT-SIDE JAVASCRIPT

$(function(){

  //foodsController holds all the functions
  var foodsController = {

    //compile template
    template: _.template($('#food-template').html()),

    //render through template and append to view
    render: function(foodObj) {
      var $foodHtml = $(foodsController.template(foodObj));
      $('#food-list').append($foodHtml);
    },

    all: function() {
      // send GET request to server to get all foods
      $.get('/api/foods', function(data) {
        var allFoods = data;
        
        // iterate through each food
        _.each(allFoods, function(food) {
          foodsController.render(food);
        });
        
        // add event-handers for updating/deleting
        foodsController.addEventHandlers();
      });
    },

    create: function(newName, newOrigin, newDesc, newImage) {
      var foodData = {name: newName, origin: newOrigin, desc: newDesc, image: newImage};
      
      // send POST request to server to create new food
      $.post('/api/foods', foodData, function(data) {
        var newFood = data;
        var $foodHtml = $(foodsController.template(foodObj));
        // console.log('hello');
      // $('#food-list').append($foodHtml);
        foodsController.render(newFood);
      });
    },


    update: function(foodId, updatedName, updatedOrigin, updatedDesc, updatedImage) {
      // send PUT request to server to update food
      $.ajax({
        type: 'PUT',
        url: '/api/foods/' + foodId,
        data: {
          name: updatedName,
          origin: updatedOrigin,
          desc: updatedDesc,
          image: updatedImage,
        },
        success: function(data) {
          var updatedFood = data;

          // replace existing food in view with updated food
          var $foodHtml = $(foodsController.template(updatedFood));
          $('#food-' + foodId).replaceWith($foodHtml);
        }
      });
    },
    
    delete: function(foodId) {
      // send DELETE request to server to delete food
      $.ajax({
        type: 'DELETE',
        url: '/api/foods/' + foodId,
        success: function(data) {
          
          // remove deleted food from view
          $('#food-' + foodId).remove();
        }
      });
    },

    // add event-handlers to foods for updating/deleting
    addEventHandlers: function() {
      $('#food-list')

        // for update: submit event on `.update-food` form
        .on('submit', '.update-food', function(event) {
          event.preventDefault();
  
          // find the food's id (stored in HTML as `data-id`)finding the current id
          var foodId = $(this).closest('.food').attr('data-id');
          
          // udpate the food with form data
          var updatedName = $(this).find('.updated-name').val();
          var updatedOrigin = $(this).find('.updated-origin').val();
          var updatedDesc = $(this).find('.updated-desc').val();
          var updatedImage = $(this).find('.updated-image').val();
          foodsController.update(foodId, updatedName, updatedOrigin, updatedDesc, updatedImage);
        })
        
        // for delete: click event on `.delete-food` button
        .on('click', '.delete-food', function(event) {
          event.preventDefault();

          // find the food's id
          var foodId = $(this).closest('.food').attr('data-id');
          
          // delete the foood
          foodsController.delete(foodId);
        });
    },

      setupView: function() {
      // append existing foods to view
      foodsController.all();
      
      // add event-handler to new-food form
      $('#new-food').on('submit', function(event) {
        event.preventDefault();
        
        // create new food with form data
        var newName = $('#new-name').val();
        var newOrigin = $('#new-origin').val();
        var newDesc = $('#new-desc').val();
        var newImage = $('#new-image').val();
        foodsController.create(newName, newOrigin, newDesc, newImage);
        
        // reset the form
        $(this)[0].reset();
        $('#new-name').focus();
      });
    }
  };

  foodsController.setupView();
});




