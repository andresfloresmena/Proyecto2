<%@page import="com.progra.guia.logic.Poliza"%>
<%@page import="com.progra.guia.presentation.cliente.polizas.Model"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>

<%
    Model model = (Model) session.getAttribute("model");
    List<Poliza> polizas = model.getPolizas();
%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
        <%@ include file="/presentation/Head.jsp" %>
        <title>Polizas</title> 
    </head>
    <body >
        <%@ include file="/presentation/Header.jsp" %>
        <div class="añadir_poliza">
            <div class="añadir_poliza-añadir">
            <p>Mis Polizas</p>
            <a href="presentation/cliente/poliza/show"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </a>
            </div>
        <button class="btn btn-success btn-block"><a href="presentation/cliente/polizas/search">Buscar Polizas</a></button>
        </div>
        <hr>
        <div style="width:50%;margin:auto; margin-top:2.5rem;">
            <table class="table table-hover table-bordered">
                <thead class="table-dark">
                    <tr> <td>Numero</td> <td>Placa</td><td>Fecha</td><td>Auto</td><td>Imagen</td><td>Valor</td></tr>
                </thead>
                <tbody>
                    <% for(Poliza c:polizas){%>
                    <tr> <td><a href="presentation/cliente/poliza/show?numeroFld=<%=c.getPlaca()%>"><%=c.getIdPoliza()%> </td>  
                        <td><%=c.getPlaca()%></td><td><%=c.getFechaInicio()%></td><td><%=c.getAuto()%></td><td><img src="presentation/cliente/poliza/getImagen?id=<%= c.getIdPolizaModelo() %>" alt="<%= c.getIdPoliza() %>" style="width: 50px; height: 50px;"></td><td>₡<%=c.getCostoTotal()%></td></tr>                                   
                    <%}%>
                </tbody>
            </table>           
        </div> 
        <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html>








