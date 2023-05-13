<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="com.progra.guia.logic.Poliza"%>
<%@page import="com.progra.guia.logic.Cobertura"%>
<%
    Poliza poliza = (Poliza) session.getAttribute("poliza");
%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
        <%@ include file="/presentation/Head.jsp" %>
        <title>JSP Page</title>
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>
        <div class="container mt-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Pago</h5>
                    <h6 class="card-subtitle mb-2 text-muted"><%=poliza.getAuto()%></h6>
                    <hr>
                    <table class="table">
                        <h5 class="card-title">Poliza</h5>
                        <tbody>
                            <tr>
                                <td>Cliente</td>
                                <td><%=poliza.getCliente().getNombre()%></td>
                            </tr>
                            <tr>
                                <td>Fecha de inicio</td>
                                <td><%=poliza.getFechaInicio()%></td>
                            </tr>
                            <tr>
                                <td>Plazo de pago</td>
                                <td><%=poliza.getPlazoPago()%></td>
                            </tr>
                            <tr>
                                <td>Costo Total</td>
                                <td><%=poliza.getCostoTotal()%></td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="table">
                        <h5 class="card-title">Coberturas</h5>
                        <thead>
                            <tr>
                                <th>Descripción de la cobertura</th>
                                <th>Costo mínimo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <% for(Cobertura c: poliza.getCobertura()) { %>
                            <tr>
                                <td><%=c.getDescripcion()%></td>
                                <td><%=c.getCostoMinimo()%></td>
                            </tr>
                            <% } %>
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-primary"><a href="/GuiaDB/presentation/cliente/polizas/show">Finalizar</a></button>
                </div>
            </div>
        </div>  
        <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html>
