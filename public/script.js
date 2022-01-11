var socket = io('http://localhost:3000');

function RenderMessage(message){
    $('#messages').append('<div class="message"><strong>' + message.author + '</strong>: ' + message.message + '</div>');
}

socket.on('previousMessage', function(messages) {
    for(message of messages){
        RenderMessage(message);
    }
});

socket.on('receivedMessage', function(message){
    RenderMessage(message);
});

function Enviar(){
    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if(author.length && message.length){
        var messageObject = {
            author: author,
            message: message,
        };

        RenderMessage(messageObject);

        socket.emit('sendMessage', messageObject);
    }else{
        alert('preencha os campos');
    }
}

function Limpar(){
    const div = document.getElementById("messages");
    
    for (child of div.children){
        child.remove();
    }
}

// caso queira usar form
/*
$('#chat').submit(function(event) {
    event.preventDefault();

    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if(author.length && message.length){
        var messageObject = {
            author: author,
            message: message,
        };

        RenderMessage(messageObject);

        socket.emit('sendMessage', messageObject);
    }else{
        alert('preencha os campos');
    }
});
*/