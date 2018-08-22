$(function() {
    var ultimaTarefa;

    function onSalvartarefaKeyDown(e) {
        if (e.which == 13) {
            addTarefa($("#tarefa").val());
            $("#tarefa").val("");
        }
    }

    function addTarefa(txt) {
        var tarefa = $("<div />").addClass("tarefa-item")
        .append(
            $("<div />").addClass("tarefa-texto").text(txt)
        ).append(
            $("<div />").addClass("tarefa-delete").append("<i />").addClass("fa fa-trash-alt")
        ).append(
            $("<div />").addClass("clear")
        );

        $("#tarefa-list").append(tarefa);
        $("#tarefa-delete").click(onDeletarTarefaClick);
        $(".tarefa-item").click(onEditarTarefaClick);
    }

    function onDeletarTarefaClick() {
            
    }
    
    function onEditarTarefaClick() {
        if (!$(this).is(ultimaTarefa)) {
            //console.log(this);
            if (ultimaTarefa != undefined) {
                salvarEditando(ultimaTarefa);
            }
            ultimaTarefa = $(this);
            var txt = ultimaTarefa.children(".tarefa-texto").text();
            var input = '<input type="text" class="tarefa-edit" value="' + txt + '">';
            ultimaTarefa.html(input);
            $(".tarefa-edit").keydown(onTarefaEditKeyDown);
        }
    }

    function salvarEditando(tarefa) {
        var txt = tarefa.children(".tarefa-edit").val();
        tarefa.empty();

        tarefa
        .append('<div class="tarefa-texto">' + txt + '</div>')
        .append('<div class="tarefa-delete"><i class="fa fa-trash-alt"></i></div>')
        .append('<div class="clear"></div>');

        $(".tarefa-delete").dblclick(onDeletarTarefaClick);
        tarefa.dblclick(onEditarTarefaClick);
    }

    function onTarefaEditKeyDown(e) {
        if (e.which == 13) {
            salvarEditando(ultimaTarefa);
            ultimaTarefa = undefined;
        }
    }

    $("#tarefa").keydown(onSalvartarefaKeyDown);
});