<%@page import="com.progra.guia.logic.Poliza"%>

<%@page import="com.progra.guia.logic.Categoria"%>
<%@page import="com.progra.guia.logic.Cobertura"%>
<%@page import="java.util.List"%>
<%@page import="com.progra.guia.presentation.cliente.poliza.Model"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
    Poliza poliza = (Poliza) session.getAttribute("poliza");
    Model model = (Model) session.getAttribute("model");
    session.setAttribute("poliza", poliza);
    List<Categoria> categorias = model.getCategorias();
%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Formulario de cotización de seguro de auto</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
        <%@ include file="/presentation/Head.jsp" %>
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>
        <div class="container my-5">
            <h1>Coberturas</h1>
            <h2>Auto: <%=poliza.getAuto()%></h2>
            <form action="presentation/cliente/poliza/pago" method="post">
                <% for(Categoria c: categorias) { %>
                <div class="mb-3">
                    <label for="<%=c.getDescripcion()%>" class="form-label"><strong class="h5"><%=c.getDescripcion()%></strong></label>
                        <% for(Cobertura cobertura: c.getCoberturas()) { %>
                    <div class="form-check">
                        <label class="form-check-label" for="<%=cobertura.getId()%>"><%=cobertura.getDescripcion()%></label>
                        <input class="form-check-input" type="checkbox" id="cobertura_<%=cobertura.getId()%>" name="cobertura_<%=cobertura.getId()%>" value="cobertura_<%=cobertura.getId()%>">
                       
                    </div>
                    <% } %>
                </div>
                <% } %>
                <button type="submit" class="btn btn-primary">Siguiente (Pago)</button>
            </form>
        </div>
        <%@ include file="/presentation/Footer.jsp" %>
    </body
</html>