
(function($){
  console.log('index.jade')
  getMenu = function(menuid) {
    $.ajax({
      url: "./menus/" + menuid,
      success: function (response) {
        var data = response.data;
        $('[name="menu_id"]').val(data.menu_id);        
        $('[name="menu_name"]').val(data.menu_name);        
        $('[name="menu_price"]').val(data.menu_price);        
        $('[name="cooking_time"]').val(data.cooking_time);    
        
        $('[name="modBtn"]').css({'display':'block'})
      }
    });
  },
  list = function() {
    $.ajax({
      url: "./menus",
      success: function (response) {
        var str = '';
        $.each(response.data, function (index, value) { 
          str += '<tr data-menuid="'+ value.menu_id +'">';
          str += '  <td  class="ddd">'+ value.menu_id + '</td>';
          str += '  <td  class="ddd">'+ value.menu_name + '</td>';
          str += '  <td  class="ddd">'+ value.menu_price + '</td>';
          str += '  <td  class="ddd">'+ value.cooking_time + '</td>';
          str += '  <td><input type="button" name="delBtn" value="삭제"/></td>';
          str += '</tr>';
        });
        $('tbody.list').html(str);
      }
    });
  },
  save = function(obj) {
    $.ajax({
      type: "post",
      url: "./menus",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (response) { list(); }, 
      error: function(err) { console.log(err); }
    });
  },
  modSave = function(obj) {
    $.ajax({
      type: "put",
      url: "./menus/"+ obj.menu_id,
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (response) { list(); }, 
      error: function(err) { console.log(err); }
    });
  },
  delMenu = function(menuid) {
    $.ajax({
      type: "delete",
      url: "./menus/"+ menuid,
      success: function (response) { list(); }, 
      error: function(err) { console.log(err); }
    });
  },
  validate = function(obj) {

    if(obj.menu_name =='') {
      alert('메뉴 아이디를 입력해주세요.');
      return;
    }
    if(obj.menu_price == '') {
      alert('가격을 입력해주세요');
      $('[name="menu_price"]').val(0);
      return;
    }
    if(obj.cooking_time == '') {
      alert('조리시간을 입력해주세요');
      $('[name="cooking_time"]').val(0);
      return;
    }
  }

})(jQuery);


$(document).ready(function () {
  
  list();

  $('[name="saveBtn"]').on('click', () => {
    var obj = $('[name="form"]').serializeObject();
    validate(obj);
    save(obj);
  });

  $(document).on('click','td.ddd', (e) => {
    debugger
    var id = $($(e.currentTarget)).closest('tr').data('menuid');
    getMenu(id);
  })

  $(document).on('click','[name="modBtn"]', (e) => {
    var obj = $('[name="form"]').serializeObject();
    validate(obj);
    modSave(obj);
  });

  $(document).on('click','[name="delBtn"]', (e) => {
    var id = $($(e.currentTarget)).closest('tr').data('menuid');
    delMenu(id);
  })
});

