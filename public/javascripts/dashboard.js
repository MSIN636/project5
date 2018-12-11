$(document).ready(function(){
  $('.deleteProject').on('click', deleteProject)
});
function deleteProject(){
var deleteId = $(this).data('id');
  var confirmation = confirm('Delete Project ?');
  if(confirmation){
    $.ajax({
          type: 'DELETE',
          url:'/admin/delete/'+deleteId
    }).done(function(response){

    });

    window.location = '/admin';
  }else{
    return false;
  }

}
