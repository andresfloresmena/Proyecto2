<%@page import="com.progra.guia.logic.Poliza"%>
<%@ page import="java.util.List" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
    List<Poliza> polizas = (List<Poliza>) request.getAttribute("polizas");
    String placa = "";
    if(polizas.size() > 0){
        placa = polizas.get(0).getPlaca();
    }
%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Consulta de Polizas</title>
        <!-- Enlace a hoja de estilos CSS de Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="../../../css/search.css"/>
        <%@ include file="/presentation/Head.jsp" %>
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>
        <div class="container">
            <h1>Consulta de Polizas</h1>
            <form method="post" action="presentation/cliente/polizas/search" class="form-inline">
                <div class="form-group">
                    <label for="codigoBuscar">Placa del carro:</label>
                    <input type="text" id="codigoBuscar" name="codigoBuscar" class="form-control" required>
                    <button type="submit" class="btn btn-primary">Consultar</button>
                    <button type="reset" class="btn btn-default">Limpiar</button>
                </div>
            </form>
            <hr>
            <%-- Si se ha enviado el formulario y se ha obtenido un ticket --%>
            <% if (request.getMethod().equals("POST") && request.getAttribute("polizas") != null) { %>
            <%-- Mostrar los detalles del ticket --%>
            <h2>Detalles de Polizas - Placa <%=placa%></h2>
            <table class="table table-hover table-bordered">
                <thead class="table-dark">
                    <tr> <td>Numero</td> <td>Fecha de inicio</td> <td>Ver más</td></tr>
                </thead>
                <tbody>
                    <% for(Poliza p: polizas){%>
                    <tr>
                        <td><%=p.getIdPoliza()%></td>
                        <td><%=p.getFechaInicio()%></td>
                        <td><a href="presentation/cliente/polizas/details?id=<%=p.getIdPoliza()%>"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                </svg></a></td>
                    </tr>
                <td></td><td></td><td></td>
                <%}%>
                </tbody>
            </table>
            <% } else if (request.getMethod().equals("POST")) { %>
            <%-- Si no se ha obtenido un ticket, mostrar mensaje de error --%>
            <div class="alert alert-danger">No se ha encontrado las polizas con la placa proporcionado.</div>
            <% }%>
        </div>
        <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html>
