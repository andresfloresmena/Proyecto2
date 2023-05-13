<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@page import="com.progra.guia.logic.Poliza"%>
<%@page import="com.progra.guia.logic.Cobertura"%>

<%
    Poliza poliza = (Poliza) request.getAttribute("poliza");
    List<Cobertura> coberturas = poliza.getCobertura();
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Tablas con Bootstrap</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
    <%@ include file="/presentation/Head.jsp" %>
</head>
<body>
<%@ include file="/presentation/Header.jsp" %>
<div class="container mt-5">
    <h2>Información detallada de la poliza</h2>
    <table class="table table-striped table-bordered">
        <table class="table table-hover table-bordered">
                <thead class="table-dark">
                <th>Nombre de Cliente</th>
                <th>Placa</th>
                <th>Plazo de Pago</th>
                <th>Auto</th>
                <th>Año</th>
                <th>Costo Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><%=poliza.getCliente().getNombre()%></td>
                <td><%=poliza.getPlaca()%></td>
                <td><%=poliza.getPlazoPago()%></td>
                <td><%=poliza.getAuto()%></td>
                <td><%=poliza.getAnnio()%></td>
                <td>₡<%=poliza.getCostoTotal()%></td>
            </tr>
        </tbody>
    </table>

    <h2>Coberturas de la poliza</h2>
    <table class="table table-hover table-bordered">
                <thead class="table-dark">
            <tr>
                <th>Descripción</th>
                <th>Costo Mínimo</th>
                <th>Costo Porcentual</th>
            </tr>
        </thead>
        <% for(Cobertura c: coberturas){%>
        <tbody>
            <tr>
                <td><%=c.getDescripcion()%></td>
                <td>₡<%=c.getCostoMinimo()%></td>
                <td><%=c.getCostoPorcentual()%></td>
            </tr>
        </tbody>
        <%}%>
    </table>
    <a href="presentation/cliente/polizas/search" class="btn btn-primary">Regresar</a>
</div>
<%@ include file="/presentation/Footer.jsp" %>
</body>
</html>