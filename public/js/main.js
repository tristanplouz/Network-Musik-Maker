var socket = io.connect();



function connect(){
    var data = {
            'username':$('#pseudo').val(),
            'salon':$('#room').val(),
            'instrument':$('#instru').val()
        };
        console.log(data);
    socket.emit('newPLayer',data);
}

window.onbeforeunload=function(){
    
    console.log('disconnect');
    socket.emit('disconnect');  
    
};