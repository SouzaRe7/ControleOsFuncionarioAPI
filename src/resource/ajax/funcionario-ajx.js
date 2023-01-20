function CarregarMeusDados(){
    //var dadosAPI = GetTnkValue();
    //var id_user_logado = dadosAPI.id_fucionario;
    var id_user_logado = "30";
    var endpoint_cliente = "DetalharMeusDadosAPI";
    var dados = {
        endpoint: endpoint_cliente,
        id_user: id_user_logado
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("porteiro_funcionario_api"),
        data: JSON.stringify(dados),
        headers:{
            'Content-Type': 'application/json'
        }, success: function(dados_ret){
            var resultado = dados_ret["result"];
            //console.log(resultado);
            $("#fuNome").val(resultado.nome);
            $("#fuEmail").val(resultado.login);
            $("#fuFone").val(resultado.fone);
            $("#cep").val(resultado.cep);
            $("#rua").val(resultado.rua);
            $("#bairro").val(resultado.bairro);
            $("#cidade").val(resultado.cidade);
            $("#uf").val(resultado.sigla_estado);
            $("#id_end").val(resultado.id_end);
        }
    })
}

function AlterarMeusDados(id_form){
    if(NotificarCamposGenerico(id_form)){
        //var dadosAPI = GetTnkValue();
        //var id_user_logado = dadosAPI.id_fucionario;
        //var id_setor_fun = dadosAPI.setor_usuario;
        var id_user_logado = "30";
        var id_setor_fun = "23";
        var dados = {
            id_user: id_user_logado,
            endpoint: "AlterarMeusDadosAPI", 
            nome: $("#fuNome").val().trim(),
            login: $("#fuEmail").val().trim(),
            fone: $("#fuFone").val().trim(),
            cep: $("#cep").val().trim(),
            rua: $("#rua").val().trim(),
            bairro: $("#bairro").val().trim(),
            cidade: $("#cidade").val().trim(),
            sigla_estado: $("#uf").val().trim(),
            id_end: $("#id_end").val().trim(),
            id_setor: id_setor_fun
        }
        $.ajax({
            type: "POST",
            url: BASE_URL_AJAX("porteiro_funcionario_api"),
            data: JSON.stringify(dados),
            headers:{
                'Content-Type': 'application/json'
            }, success: function(dados_ret){
                var resultado = dados_ret["result"];
                //console.log(resultado);
                if(resultado == 1){
                    MensagemSucesso();
                }else{
                    MensagemErro();
                }
            }
        })
    }
    return false;
}

function CarregarEquipamentosAlocados(){
    //var dadosAPI = GetTnkValue();
    //var id_setor_fun = dadosAPI.setor_usuario;
    var id_setor_fun = "23";
    var combo_equipamento = $("#equipamento");
    combo_equipamento.empty();
    var dados = {
        endpoint: "SelecionarEquipamentosAlocadosAPI",
        id_setor: id_setor_fun
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("porteiro_funcionario_api"),
        data: JSON.stringify(dados),
        headers:{
            'Content-Type': 'application/json'
        },
        success: function(dados_ret){
            var resultado = dados_ret["result"];
            //console.log(resultado);
            $('<option>').val("").text("Selecione").appendTo(combo_equipamento);
            $(resultado).each(function(){
               $('<option>').val(this.alocID).text(this.TipoEnome + " / " + this.nomeMo + " / " + this.identificacao).appendTo(combo_equipamento);
            })

        }
    })

}

function AbrirChamado(id_form){
    if(NotificarCamposGenerico(id_form)){
        //var dadosAPI = GetTnkValue();
        //var id_user_logado = dadosAPI.id_fucionario;
        var id_user_logado = "30";
        var dados = {
            endpoint: "AbrirChamadoAPI",
            id_user: id_user_logado,
            problema: $("#fuObs").val().trim(),
            id_alocar: $("#equipamento").val()
        }
        $.ajax({
            type: "POST",
            url: BASE_URL_AJAX("porteiro_funcionario_api"),
            data: JSON.stringify(dados),
            headers:{
                'Content-Type': 'application/json'
            },
            success: function(dados_ret){
                var resultado = dados_ret['result'];
                //console.log(resultado);
                if(resultado == 1){
                    MensagemSucesso();
                    CarregarEquipamentosAlocados();
                    LimparCampos(id_form);
                }else{
                    MensagemErro();
                }
            }
        })
    }
}

function FiltrarChamado(){

    var dados = {
        situacao: $("#situacao").val(),
        endpoint: "FiltrarChamadoAPI"
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("porteiro_funcionario_api"),
        data: JSON.stringify(dados),
        headers:{
            'Content-Type': 'application/json'
        },
        success: function(dados_ret){
            var ret_chamado = dados_ret['result'];
            //console.log(resultado);
            if (ret_chamado != ""){
                var table_start = '';
                var table_head = '';
                var table_data = '';
                var table_end = '';

                table_start = '<table class="table table-hover" id="divTable"><thead>';
                    table_head = '<tr>';
                    table_head += '<th>Data abertura</th>';
                    table_head += '<th>Funcionário</th>';
                    table_head += '<th>Equipamento</th>';
                    table_head += '<th>Problema</th>';
                    table_head += '<th>Data atendimento</th>';
                    table_head += '<th>Técnico</th>';
                    table_head += '<th>Data encerramento</th>';
                    table_head += '<th>Laudo</th>';
                    table_head += '</tr></thead><tbody>';
                $(ret_chamado).each(function(){
                    table_data += '<tr>';
                    table_data += '<td>' + this.data_abertura + '</td>';
                    table_data += '<td>' + this.nome_func + '</td>';
                    table_data += '<td>' + this.identificacao + ' / Modelo: '  + this.nome_modelo + ' / ' + this.nome_tipo + '</td>';
                    table_data += '<td>' + this.descricao_problema + '</td>';
                    table_data += '<td>' + (this.data_adendimento == null ? '-' : this.data_adendimento) + '</td>';
                    table_data += '<td>' + (this.nome_tec == null ? '-' : this.nome_tec) + '</td>';
                    table_data += '<td>' + (this.data_encerramento == null ? '-' : this.data_encerramento) + '</td>';
                    table_data += '<td>' + (this.laudo_tecnico == null ? '-' : this.laudo_tecnico) + '</td>';
                    table_data += '</tr>';
                })
                table_end = '</tbody></table>';
                // Vaso é toda as partes da tabela
                var vaso = table_start + table_head + table_data + table_end;
                $("#tableResult").html(vaso);
                $("#divChamado").show();
            }else{
                MensagemGenerica("Não foi encontrado nenhum chamado");
                $("#divChamado").hide();
            }
        }
    })
}

function VerificarSenhaAtual(id_form){
    if(NotificarCamposGenerico(id_form)){
        var dadosAPI = GetTnkValue();
        var id_user_logado = dadosAPI.id_funcionario;
        //var id_user_logado = "30";
        var dados = {
            endpoint: "VerificarSenhaAtualAPI",
            id: id_user_logado,
            senha: $("#fuSenhaAtual").val().trim()
        }

        $.ajax({
            type: "post",
            url: BASE_URL_AJAX("porteiro_funcionario_api"),
            data: JSON.stringify(dados),
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
                'Content-Type': 'application/json'
            },
            success: function(dados_ret){
                //alert("aqui");
                console.log(dados_ret);
                var resultado = dados_ret['result'];
                if(resultado == -1){
                    MensagemGenerica("Senha atual não confere");
                }else if(resultado == 1){
                    $("#divSenhaAtual").hide();
                    $("#divSenhaNova").show();
                }else if(resultado == -1000){
                    ClearTnk();
                    ChamarOutraPagina("login");
                }
            }
        })
    }
    return false;
}

function AtualizarSenha(id_form){
    if(NotificarCamposGenerico(id_form)){
        //var dadosAPI = GetTnkValue();
        //var id_user_logado = dadosAPI.id_fucionario;
        var id_user_logado = "30";
        var dados = {
            endpoint: "AtualizarSenhaAPI",
            id: id_user_logado,
            senha: $("#fuSenha").val().trim(),
            repetir_senha: $("#fuReSenha").val().trim()
        }
        $.ajax({
            type: "post",
            url: BASE_URL_AJAX("porteiro_funcionario_api"),
            data: JSON.stringify(dados),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(dados_ret){
                var resultado = dados_ret['result'];
                if (resultado == -2){
                    MensagemGenerica("A senha deverá conter no mínimo 6 caracteres");
                } else if (resultado == -3){
                    MensagemGenerica("O campo senha e repetir senha não conferem");
                } else if (resultado == 1){
                    MensagemSucesso();
                    $("#divSenhaNova").hide();
                    $("#divSenhaAtual").show();
                } else if (resultado == -1){
                    MensagemErro();
                } else if (resultado == -1000){
                    ClearTnk();
                    ChamarOutraPagina("login");
                }
            }
        })
    }
    return false;
}

function ValidarAcesso(id_form){
    if(NotificarCamposGenerico(id_form)){
        var dados = {
            login: $("#login").val(),
            senha: $("#senha").val(),
            endpoint: "AutenticarAPI"
        }
        $.ajax({
            type: "post",
            url: BASE_URL_AJAX("porteiro_funcionario_api"),
            data: JSON.stringify(dados),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(dados_ret){
                //console.log(dados_ret);
                var resultado = dados_ret['result'];
                console.log(resultado);
                if (resultado == -3){
                    MensagemGenerica("Usuario não autorizado");
                }else{
                    AddTnk(resultado);
                    location = "meus_chamados.php";
                }
            }
        })
    }
    return false;
}