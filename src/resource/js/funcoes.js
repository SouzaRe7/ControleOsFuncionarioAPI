function Load() {
    $("#divLoad").addClass("overlay dark").html('<div class="overlay dark"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>');
}
function RemoverLoad() {
    $("#divLoad").removeClass("overlay dark").html('');
}
function BASE_URL_AJAX(file_ajax) {
    return "http://localhost/ControlesOs1/src/resource/api/" + file_ajax + ".php";
}
function ChamarOutraPagina(pagina){
    location = pagina + ".php";
}
function NotificarCampo(nome_id) {
    if ($("#" + nome_id).val().trim() == '')
        $("#" + nome_id).addClass("is-invalid");
    else
        $("#" + $nome_id).removeClass("is-invalid").addClass("is-valid");
}
function NotificarCamposGenerico(form_id) {
    var ret = true;
    $("#" + form_id + " input, select, textarea ").each(function () {
        if ($(this).hasClass("obg")) {
            if ($(this).val().trim() == "") {
                ret = false;
                $(this).addClass("is-invalid");
            } else {
                $(this).removeClass("is-invalid").addClass("is-valid");
            }
        }
    })
    if (!ret)
        MensagemCamposObrigatorios();
    else
        Load();
    return ret;
}
function LimparCampos(form_id){
    $("#" + form_id + " input, select, textarea ").each(function () {
        $(this).val('');
    })
}
function LimparCamposGenerico(form_id) {

    $("#" + form_id + " input, select, textarea ").each(function () {
        if ($(this).hasClass("obg")) {
            $(this).val('');
        }
        if($(this).hasClass("is-invalid")){
            $(this).removeClass("is-invalid");
        }else{
            $(this).removeClass("is-valid");
        }
    })
}
function LimparNotificarCamposGenerico(form_id){
    $("#" + form_id + " input, select, textarea ").each(function () {
        $(this).removeClass("is-invalid");
        $(this).removeClass("is-valid");
    })
}
function CarregarVerMais(DtAtendimento, DtEncerramento, TecnicoAtendimento, TecnicoEncerramento, Laudo){
    $("#modalDtAtendimento").val(DtAtendimento);
    $("#modalDtEncerramento").val(DtEncerramento);
    $("#modalTecnicoAtendimento").val(TecnicoAtendimento);
    $("#modalTecnicoEncerramento").val(TecnicoEncerramento);
    $("#modalLaudo").val(Laudo);
    if(DtEncerramento == "null"){
        let msg = "Não foi encerrado";
        $("#modalDtEncerramento").val(msg);
        $("#modalTecnicoEncerramento").val(msg);
        $("#modalLaudo").val(msg);
    }
}
function AddTnk(t) {
    localStorage.setItem('user_tkn', t);
}
function GetTnkValue() {
    var token = GetTnk();
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    console.log(base64Url); // Adicionar essa linha
    console.log(base64); 
    var j = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(j);
}  
function GetTnk() {
    if (localStorage.getItem('user_tkn') != null)
        return localStorage.getItem('user_tkn');
}
function Verify() {
    if (localStorage.getItem('user_tkn') === null)
        location = "login.php";
} 
function ClearTnk() {
    localStorage.clear();
}
function Sair(){
    localStorage.clear();
    ChamarOutraPagina("login");
}