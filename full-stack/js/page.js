$(function(){

  // 1. 全选，反选商品，商品选中整行背景色高亮，颜色：#FFFDC6
  $(document).on("change", ".select-all", function(e){
    var input =$('input[type="checkbox"]');

    if($(this).is(":checked")){
      input.prop("checked", true);
    }else{
      input.prop("checked", false);
    }
  })
  .on("change", "input[type=checkbox]", function(e){
    var $td = $(this).parent().parent().children('td');
    if($(this).is(":checked")) {
      $td.attr("prev-color", $td.css('background-color'));
      $td.css('background-color', '#FFFDC6');
    } else {
      $td.css('background-color', $td.attr("prev-color"));
    }

  })


  // 2. 过滤：有库存，无库存。符合条件商品选中高亮
  $('ul li').eq(0).click(function(){
    $(this).css('background-color', '#FFFDC6');
    $('ul li').eq(1).css('background-color', '#FFFFFF');
    $('tbody tr').each(function(index) {
      var count = $(this).children('td').eq(3).text();
      if(count <= 0) {
        $(this).hide();
      }
      else {
        $(this).show();
      }
    });
  });
  
  $('ul li').eq(1).click(function(){
    $(this).css('background-color', '#FFFDC6');
    $('ul li').eq(0).css('background-color', '#FFFFFF');
    $('tbody tr').each(function(index) {
      var count = $(this).children('td').eq(3).text();
      if(count > 0) {
        $(this).hide();
      }
      else {
        $(this).show();
      }
    });
  });
  
  
  // 3. 新建商品出现新建浮层，点击保存在列表最前面插入一行，取表单数据；
  $(".create").click(function(){  
    $(".fade").show();  
  });


  $("#cancel").click(function(){
    $(".fade").hide();
  });

  $("#save").click(function(){
    var name = $("input[name='name']").val();
    var price = $("input[name='price']").val();
    var stock = $("input[name='stock']").val();
    
    var html = "<tr>"+
        "<td><input type='checkbox'></td>"+
        "<td><div class='product-info'>"+name+"</div></td>"+
        "<td><div class='price'>"+price+"</div></td>"+
        "<td><div class='stock'>"+stock+"</div></td>"+
        "<td>"+
          "<a href='#' class='moveup'>上移</a>"+
          "<a href='#' class='movedown'>下移</a>"+
          "<a href='#' class='remove'>删除</a>"+
        "</td></tr><tr>";  
    
        $("tbody").prepend(html);
        $(".fade").hide();
  });
  
  // 4.实现删除列功能；
  $(".remove").on("click",function(e){
  	$(this).parents("tr").remove();
  });
  
    // 5.列上移，下移
  $('.moveup').click(function(e){
  var a = $(e.target);
  var tr = a.parent().parent();
  var p = tr.parent();
  var index = tr.index(p);
  if(index === 0){
        alert("已经在最上面");return;
    }
    else{
      var trb = tr.prev();
      trb.before(tr);
    }
  });
    
  $('.movedown').click(function(e){
    var a = $(e.target);
    var tr = a.parent().parent();
    var p = tr.parent();
    var index = tr.index(p);
    if(index === p.length-1){
          alert("已经在最下面");return;
      }
      else{
        var trb = tr.next();
        trb.after(tr);
      }
  });

  // 6. 库存实现行编辑，焦点消失替换商品库存；
  $('tr').each(function(){
    $(this).children('td').eq(3).click(function(e){
      var kucun = $(this).text();
      $(this).html('<input name="edit" type="text" style="display:block" value="' + kucun + '"/>');
        
      var $self = $(this);
    
      $('input[name=edit]').focus(); 
      $('input[name=edit]').blur(function(){
        $self.html($(this).val());
      });
    });
  });

});